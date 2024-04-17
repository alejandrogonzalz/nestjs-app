import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskAssignment } from 'src/tasks/entities/task-assignment.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(TaskAssignment)
    private readonly taskAssignmentRepository: Repository<TaskAssignment>,
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
    query = query.addSelect('COUNT(task.id)', 'taskCount');
    query = query.addSelect('SUM(task.cost)', 'totalTaskCost');

    query = query.groupBy('user.id');
    return await query.getRawMany();
  }
}
