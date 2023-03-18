import { Module } from '@nestjs/common';
import { UserAuthService } from './user_auth.service';
import { UserAuthController } from './user_auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity, UserBusinessBranchEntity, UserBusinessProfileEntity } from '../user_account/entities/user_account.entity';
import { UserAccountService } from '../user_account/user_account.service';
import { UserAccountRepository } from '../user_account/repository/user_acount.repository';
import { UserBusinessBranchRepository } from '../user_account/repository/user_business_branch.repository';
import { UserBusinessProfileRepository } from '../user_account/repository/user_business_profile_repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { UserRefreshTokenRepository } from './repository/user_refresh_token.repository';
import { UserRefreshTokenEntity } from './entities/user_refresh_token.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: parseInt(config.get(Configuration.EXPIRESIN)),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserAccountEntity, UserBusinessBranchEntity, UserBusinessProfileEntity, UserRefreshTokenEntity])],
  controllers: [UserAuthController],
  providers: [UserRefreshTokenRepository, UserAccountRepository, UserBusinessBranchRepository,
    UserBusinessProfileRepository, UserAuthService, JwtStrategy,
    UserAccountService, ConfigService],
  exports: [JwtModule],
})
export class UserAuthModule { }
