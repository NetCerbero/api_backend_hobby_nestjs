import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAuthService } from './user_auth.service';
import { UserAuthDto } from './dto/user_auth.dto';
import { IpAddress } from 'src/core/decoration/ipAddress.decorator';
import { UserAgent } from 'src/core/decoration/userAgent.decorator';

@Controller('v1/user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }

  @Post("/login")
  login(@Body() userAuthDto: UserAuthDto, @UserAgent() userAgent, @IpAddress() ip) {
    return this.userAuthService.auth(userAuthDto, {  userAgent, ip });
  }


}
