import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UserAuthService } from '../user_auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Configuration } from 'src/config/config.keys';
import { IJwtPayload } from '../interface/user_auth_session.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: UserAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    const business = req.headers['x-tenant-id'];
    const validate = await this._authService.getValidateJwtAndDomain(payload, {
      business: ['', 'null', 'undefined'].includes(business) ? null : business,
    });
    return validate;
  }
}
