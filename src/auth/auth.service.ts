import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { SignUpDto, SigninDto } from './dto';
import { MongoServerError } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private User: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    try {
      const hashed_password = await argon.hash(dto.password);

      const user = await this.User.create({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        hashedPassword: hashed_password,
        address: dto.address,
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      console.log(error);
      if (error instanceof MongoServerError) {
        if (error.code == '11000') {
          throw new ForbiddenException(
            'This email or phone number is already used, please use a new number and email!',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    // find the user by email
    const user = await this.User.findByEmail(dto.email);

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hashedPassword, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
