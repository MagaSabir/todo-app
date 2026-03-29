import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('✅ Prisma connected to SQLite');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('🛑 Prisma disconnected');
  }
}
