import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'; 
import { AuthService, LoginPayload, RegisterPayload } from './';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { User, UsersService, LoginLogService } from './../user';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly loginLogService: LoginLogService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload); 
    await this.loginLogService.addLoginLog(parseInt(JSON.stringify(user.id)));
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @Get('userTeam')
  @ApiResponse({ status: 201, description: 'Successful Get Users' }) 
  async team(): Promise<any> {
    const user = await this.userService.team();
    return await user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
