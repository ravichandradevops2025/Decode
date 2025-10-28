import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDTO, RegisterDTO, AuthResponse } from '../../../shared/types/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDTO): Promise<AuthResponse> {
    const { email, password, name } = registerDto;
    
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
      provider: 'email',
    });

    const tokens = await this.generateTokens(user);
    return { user, ...tokens };
  }

  async login(loginDto: LoginDTO): Promise<AuthResponse> {
    const { email, password } = loginDto;
    
    const user = await this.userModel.findOne({ email });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    return { user, ...tokens };
  }

  async validateOAuthUser(profile: any): Promise<User> {
    const { email, name, avatar, provider } = profile;
    
    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = await this.userModel.create({
        email,
        name,
        avatar,
        provider,
      });
    }
    
    return user;
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async generateTokens(user: UserDocument) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user._id },
        { expiresIn: '15m' }
      ),
      this.jwtService.signAsync(
        { sub: user._id },
        { expiresIn: '7d' }
      ),
    ]);

    user.refreshToken = refreshToken;
    await user.save();

    return { token, refreshToken };
  }
}