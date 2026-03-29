import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '@prisma/client';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ enum: ['TODO', 'IN_PROGRESS', 'DONE'] })
  status: TaskStatus;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH'] })
  priority: TaskPriority;

  @ApiProperty({ required: false })
  dueDate?: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
