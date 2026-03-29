import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskQueryDto } from './dto/task-query.dto';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserInterface } from '../auth/interfaces/current-user.interface';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiResponse({ status: 201, type: TaskResponseDto })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({
    summary:
      'Получить все задачи текущего пользователя с фильтрами и пагинацией',
  })
  @ApiResponse({ status: 200, type: [TaskResponseDto] })
  findAll(
    @CurrentUser() user: CurrentUserInterface,
    @Query() query: TaskQueryDto,
  ) {
    return this.tasksService.findAll(user, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить одну задачу по ID' })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу (soft delete)' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserInterface) {
    return this.tasksService.remove(id, user);
  }
}
