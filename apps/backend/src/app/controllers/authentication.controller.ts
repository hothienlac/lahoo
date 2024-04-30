import { Body, Controller, Get, Post } from '@nestjs/common';
import { SystemAuthenticationService } from '@lahoo/system-authentication';
import { LoginService } from '@lahoo/authentication';
import { API_AccessToken, API_LoginRequest, API_User, API_loginRequestSchema } from '@lahoo/api';
import { ParseBodyPipe } from '@lahoo/system-pipe';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly systemAuthenticationService: SystemAuthenticationService,
        private readonly loginService: LoginService,
    ) {}

    @Get('me')
    async me(): Promise<API_User> {
        const user = this.systemAuthenticationService.getUser();
        return this.systemAuthenticationService.removeUserSecuredFields(user);
    }

    @Post('login')
    async login(
        @Body(new ParseBodyPipe(API_loginRequestSchema)) body: API_LoginRequest,
    ): Promise<API_AccessToken> {
        return this.loginService.login(body.idToken);
    }
}
