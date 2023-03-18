import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageException } from 'src/core/exception/messageException';
import { UserAccountService } from '../user_account/user_account.service';
import { UserAuthDto } from './dto/user_auth.dto';
import { compare } from 'bcryptjs';
import {
  UserAccountEntity,
  UserAccountStatus,
  UserAccountType,
  UserBusinessProfileEntity,
} from '../user_account/entities/user_account.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { UserRefreshTokenRepository } from './repository/user_refresh_token.repository';
import { IJwtPayload, IUserAuthSession } from './interface/user_auth_session.interface';
import { isNullOrUndefined } from 'src/core/utils/extraUtils';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserAccountService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(UserRefreshTokenRepository)
    private readonly userToken: UserRefreshTokenRepository,
  ) {}

  async getValidateJwtAndDomain(payload: IJwtPayload,domain:{business:any}) {
    const user = await this.userService.findUserById(payload.userId);
    await this.checkStatus(user);
    await this.checkSessionByIdAndUser(payload.sessionId, payload.userId);
    
    //not admin + not business null => true empresa
    if(user.type===UserAccountType.BUSINESS){
      if(isNullOrUndefined(domain.business)) throw new ConflictException("Ups!, debe elegir un dominio");
      const find = await this.getBusinessSelected(
        domain.business,
        user.business
      );
      if(!find) throw new ConflictException("Ups!, no tiene acceso a este dominio.");
    }

    return {
      ...payload,
      permissions: ['hambre',"category_create"],
      tenantId: domain.business,
      type: user.type,
    } as IUserAuthSession;
  }

  private async getBusinessSelected(business: number, listBusiness: UserBusinessProfileEntity[]) {
    return  listBusiness.find((lb) => lb.businessProfileId === business && lb.default );
  }

/*   async isBranchOwnBusiness(
    branch: any,
    business: any,
    listBranches: BusinessBranchEntity[],
  ) {
    const isCorrect = listBranches.some(
      (lb) => lb.id === branch && business === lb.businessId,
    );

    if(!isCorrect) throw new ConflictException("Ups!, ambos debes ser del mismo dominio.");
  } */

  private async checkSessionByIdAndUser(sessionId: string, userId: any) {
    const session = await this.userToken.getByIdAndUser(sessionId, userId);
    if (!session) throw new ConflictException('Ups!, session inválida.');
    if (new Date() > session.expiration )
      throw new ConflictException('Ups!, token inválido.');
  }

  private async checkStatus(user: UserAccountEntity) {
    if (user.status === UserAccountStatus.INACTIVO)
      throw new ConflictException('Ups!, cuenta no disponible.');
  }

  async auth(params: UserAuthDto, device?: { userAgent: string; ip: string }) {
    const user = await this.userService.findUserByEmail(params.email);
    if (!user) throw new NotFoundException(MessageException.NOT_FOUND_USER);
    if (!this.checkPasswordEqual(params.password, user.password))
      throw new ConflictException('Ups!, verifique su contraseña.');
    this.checkStatus(user);
    const session = await this.createSession({ userId: user.id, device });
    const token = await this.buildTokenByUser({
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      sessionId: session.id,
    });
    const refresh = await this.buildRefreshToken({userId:user.id,sessionId:session.id});
    
    return { token, refresh };
  }

  private async buildTokenByUser(params: {
    userId: number;
    displayName: string;
    email: string;
    sessionId:string
  }) {
    const accessToken = this.jwtService.sign(params);
    return accessToken;
  }

  private async buildRefreshToken(params:{userId:number,sessionId:string}){
    const expirationMilisecons = parseInt(
      this.configService.get(Configuration.REFRESH_TOKEN_TTL),
    );
    const refresh = this.jwtService.sign(
      {
        sessionId:params.sessionId,
        userId:params.userId,
      },
      { expiresIn: expirationMilisecons },
    );
    return refresh;
  }

  private async createSession(params: {
    userId: number;
    device?: { ip: string; userAgent: string };
  }) {
    const expiration = new Date();
    const expirationMilisecons = parseInt(
      this.configService.get(Configuration.REFRESH_TOKEN_TTL),
    );
    expiration.setSeconds(expiration.getSeconds() + expirationMilisecons);

    const sesionSave = await this.userToken.save({
      expiration,
      userId: params.userId,
      userAgent: params.device.userAgent,
      ip: params.device.ip,
    });
    return sesionSave;
  }

  private async checkPasswordEqual(passwordTxt: string, passwordHash: string) {
    return await compare(passwordTxt, passwordHash);
  }
}
