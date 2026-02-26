import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(emailOrUsername: string, pin: string) {
    const admin = await this.adminRepo.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!admin) throw new UnauthorizedException('Admin not found');

    const isMatch = await admin.comparePin(pin);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      token: this.jwtService.sign({ id: admin.id }),
    };
  }

  async getProfile(adminId: string) {
    return this.adminRepo.findOne({
      where: { id: adminId },
      select: ['id', 'username', 'email', 'isSuperAdmin'],
    });
  }

  async updateProfile(adminId: string, data: any) {
    await this.adminRepo.update(adminId, data);
    return this.getProfile(adminId);
  }

  async updatePin(adminId: string, oldPin: string, newPin: string) {
    const admin = await this.adminRepo.findOneBy({ id: adminId });
    if (!admin) throw new NotFoundException();

    const isMatch = await admin.comparePin(oldPin);
    if (!isMatch) throw new BadRequestException('Old PIN is incorrect');

    admin.pin = newPin;
    await this.adminRepo.save(admin);

    return { message: 'PIN updated successfully' };
  }
}