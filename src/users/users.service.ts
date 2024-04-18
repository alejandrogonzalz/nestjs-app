import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from 'src/tasks/dto/task-status.enum';
import { TaskAssignment } from 'src/tasks/entities/task-assignment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  TaskCompletionUser,
  TaskCompletionUserDTO,
} from './dto/task-completion-users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(TaskAssignment)
    private readonly taskAssignmentRepository: Repository<TaskAssignment>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAllUsers(
    name?: string,
    email?: string,
    role?: string,
  ): Promise<User[]> {
    let query = this.usersRepository.createQueryBuilder('user');

    if (name) {
      query = query.where('user.name LIKE :name', { name: `%${name}%` });
    }
    if (email) {
      query = query.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }
    if (role) {
      query = query.andWhere('user.role = :role', { role });
    }

    query = query.leftJoin(
      TaskAssignment,
      'assignment',
      'user.id = assignment.userId',
    );
    query = query.leftJoin('assignment.task', 'task');
    query = query.addSelect('user.id', 'userId');
    query = query.addSelect('COUNT(assignment.userId)', 'taskCount');
    query = query.addSelect('SUM(task.cost)', 'totalTaskCost');

    query = query.groupBy('user.id');
    return await query.getRawMany();
  }

  async getTaskCompletionUsersStatistics(): Promise<TaskCompletionUserDTO[]> {
    const taskAssignments = await this.taskAssignmentRepository.find({
      relations: ['user', 'task'],
    });
    const taskCompletionUsers: TaskCompletionUser[] = [];

    for (const taskAssignment of taskAssignments) {
      let existingUser = taskCompletionUsers.find(
        (user) => user.email === taskAssignment.user.email,
      );
      if (!existingUser) {
        existingUser = new TaskCompletionUser(
          taskAssignment.user.name,
          taskAssignment.user.email,
          taskAssignment.user.role,
        );
        taskCompletionUsers.push(existingUser);
      }

      // Increment totalTasks count for the user
      existingUser.incrementTotalTasks();

      // Increment task completion if the task is finished
      if (taskAssignment.task.status === TaskStatus.FINISHED) {
        existingUser.incrementTaskCompletion();
      }
    }

    taskCompletionUsers.forEach((user) => {
      user.calculateCompletionRatio();
    });

    const usersDTO: TaskCompletionUserDTO[] = taskCompletionUsers.map(
      (user) => ({
        name: user.name,
        email: user.email,
        completionRatio: user.completionRatio,
        completedTasks: user.taskCompletion,
        totalTasks: user.totalTasks,
      }),
    );

    return usersDTO;
  }
}
