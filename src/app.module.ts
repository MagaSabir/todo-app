import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      validate: (env: Record<string, any>) => {
        if (!env.JWT_SECRET) {
          throw new Error('JWT_SECRET is required');
        }
        return env;
      },
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
