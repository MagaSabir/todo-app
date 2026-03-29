import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { CurrentUser } from '../auth/interfaces/current-user.interface';
import { TaskStatus, TaskPriority, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, user: CurrentUser) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        priority: createTaskDto.priority,
        dueDate: createTaskDto.dueDate,
        userId: user.id,
      },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });
  }

  async findAll(user: CurrentUser, query: TaskQueryDto = {}) {
    const {
      status,
      priority,
      dueDateFrom,
      dueDateTo,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = { userId: user.id };

    if (status) where.status = status as TaskStatus;
    if (priority) where.priority = priority as TaskPriority;

    if (dueDateFrom || dueDateTo) {
      where.dueDate = {};
      if (dueDateFrom) where.dueDate.gte = new Date(dueDateFrom);
      if (dueDateTo) where.dueDate.lte = new Date(dueDateTo);
    }

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder } as Prisma.TaskOrderByWithRelationInput,
        include: {
          user: { select: { id: true, email: true, name: true } },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, user: CurrentUser) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.userId !== user.id) {
      throw new ForbiddenException('У вас нет доступа к этой задаче');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: CurrentUser) {
    await this.findOne(id, user);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });
  }

  async remove(id: string, user: CurrentUser) {
    await this.findOne(id, user);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
