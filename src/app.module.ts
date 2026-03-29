import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TasksModule],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
