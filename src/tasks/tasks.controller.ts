import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception-filters';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
@UseFilters(HttpExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksService.createTask(createTaskDto);
    return newTask;
  }

  @Get('getAllTasks')
  async getTasks(
    @Query('orderBy') orderBy?: string,
    @Query('expirationDate') expirationDate?: string,
    @Query('name') name?: string,
    @Query('userId') userId?: number,
  ): Promise<Task[]> {
    return this.tasksService.getFilteredAndOrderedTasks(
      orderBy,
      expirationDate,
      name,
      userId,
    );
  }

  @Patch('updateTask/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete('deleteTask/:id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
