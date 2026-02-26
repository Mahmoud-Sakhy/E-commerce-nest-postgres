import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminJwtGuard } from '../auth/admin-jwt.guard';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateAdminPinDto } from './dto/update-admin-pin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto.emailOrUsername, dto.pin);
  }

  @Get('profile')
  @UseGuards(AdminJwtGuard)
  profile(@Req() req) {
    return this.adminService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(AdminJwtGuard)
  updateProfile(@Req() req, @Body() body) {
    return this.adminService.updateProfile(req.user.id, body);
  }

  @Put('pin')
  @UseGuards(AdminJwtGuard)
  updatePin(@Req() req, @Body() dto: UpdateAdminPinDto) {
    if (dto.newPin !== dto.confirmPin) {
      throw new Error('PIN mismatch');
    }
    return this.adminService.updatePin(
      req.user.id,
      dto.oldPin,
      dto.newPin,
    );
  }
}