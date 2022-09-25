import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { omit } from '@wellness/common';
import { Administrator, BycriptService } from '@wellness/core';
import { EntityManager } from 'typeorm';
import { LoginAdminInput } from '../dto';
import { AccessTokenResponse } from '../model';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private jwtService: JwtService,
    private readonly bcryptService: BycriptService
  ) {}
  async validate(email: string, password: string): Promise<Administrator> {
    const admin = await this.manager
      .getRepository(Administrator)
      .findOne({ where : {
        email
      }});

    const isValid = await this.bcryptService.compare(password, admin.password);
    if (admin && isValid) {
      return admin;
    }
    return null;
  }

  async login(user: LoginAdminInput): Promise<AccessTokenResponse> {
    const userFound = await this.validate(user.email, user.password);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    const payload = omit(userFound, ['password', 'updateAt', 'createdAt']);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
