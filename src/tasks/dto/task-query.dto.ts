import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class TaskQueryDto {
  @ApiPropertyOptional({ enum: ['TODO', 'IN_PROGRESS', 'DONE'] })
  @IsOptional()
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';

  @ApiPropertyOptional({ enum: ['LOW', 'MEDIUM', 'HIGH'] })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';

  @ApiPropertyOptional({ example: '2026-04-01' })
  @IsOptional()
  @IsDateString()
  dueDateFrom?: string;

  @ApiPropertyOptional({ example: '2026-04-30' })
  @IsOptional()
  @IsDateString()
  dueDateTo?: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 10)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['createdAt', 'dueDate', 'title'],
    default: 'createdAt',
  })
  @IsOptional()
  sortBy?: 'createdAt' | 'dueDate' | 'title' = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
