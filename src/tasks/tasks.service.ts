import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, parse } from 'date-fns';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskAssignment } from './entities/task-assignment.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(TaskAssignment)
    private readonly tasksAssignmentRepository: Repository<TaskAssignment>,
  ) {}

  formatDateToIso(dateString: string) {
    try {
      const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
      const isoDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      return isoDate;
    } catch (error) {
      console.error('Error parsing date:', error.message);
      return null;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const formattedDeadline = this.formatDateToIso(createTaskDto.deadline);

    if (!formattedDeadline) {
      throw new HttpException(
        'Invalid deadline format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const users = await this.usersRepository.find({
      where: { id: In(createTaskDto.usersId) },
    });

    if (users?.length === 0 || !users) {
      throw new HttpException(
        'There are no users with those ids',
        HttpStatus.BAD_REQUEST,
      );
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      deadline: formattedDeadline,
    });

    const savedTask = await this.tasksRepository.save(task);

    const taskAssignments = users.map((user) =>
      this.tasksAssignmentRepository.create({
        task: savedTask,
        user,
      }),
    );

    await this.tasksAssignmentRepository.save(taskAssignments);

    return savedTask;
  }

  async getFilteredAndOrderedTasks(
    orderBy: string = 'asc',
    expirationDate?: string,
    name?: string,
    userId?: number,
  ): Promise<Task[]> {
    let query = this.tasksRepository.createQueryBuilder('task');

    if (expirationDate) {
      const formattedExpirationDate = this.formatDateToIso(expirationDate);
      if (!formattedExpirationDate) {
        throw new Error('Invalid expiration date format');
      }
      query = query.where('task.deadline <= :expirationDate', {
        expirationDate: formattedExpirationDate,
      });
    }
    if (name) {
      query = query.andWhere('task.title LIKE :name', { name: `%${name}%` });
    }

    if (userId) {
      query = query
        .leftJoin(TaskAssignment, 'assignment', 'task.id = assignment.userId')
        .andWhere('assignment.userId = :userId', { userId });
    }

    // Apply ordering
    if (orderBy === 'desc') {
      query = query.orderBy('task.deadline', 'DESC');
    } else {
      query = query.orderBy('task.deadline', 'ASC');
    }

    return query.getMany();
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = { ...task, ...updateTaskDto };

    return this.tasksRepository.save(updatedTask);
  }

  async delete(id: number): Promise<{ message: string; deletedTask: Task }> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.tasksRepository.delete(task);
    return { message: 'Task deleted successfully', deletedTask: task };
  }
}
