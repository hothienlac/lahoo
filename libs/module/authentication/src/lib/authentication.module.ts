import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from './jwt/jwt.service';
import { LoginService } from './login/login.service';
import { ConfigModule } from '@lahoo/config';
import { SystemFirebaseModule } from '@lahoo/system-firebase';

@Module({
    imports: [ConfigModule, SystemFirebaseModule],
    providers: [JwtService, UserService, LoginService],
    exports: [UserService, LoginService],
})
export class AuthenticationModule {}
