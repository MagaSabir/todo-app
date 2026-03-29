import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Купить молоко' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Купить 2 литра молока', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' })
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  @IsOptional()
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO';

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  @IsOptional()
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';

  @ApiProperty({ example: '2026-04-15', required: false })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
