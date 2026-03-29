import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
