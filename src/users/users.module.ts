import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignment } from 'src/tasks/entities/task-assignment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, TaskAssignment])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
