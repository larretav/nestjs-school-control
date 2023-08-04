import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './../auth.service';
import { jwtConstants } from '../auth.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // async validate(payload: any) {
  //   return { password: payload.password, userKey: payload.userKey };
  // }

  async validate(payload: any){
    const user = await this.authService.validateUser(payload.email, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
