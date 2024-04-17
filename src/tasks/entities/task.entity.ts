import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../dto/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  estimationHours: number;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @ManyToMany(() => User, (user) => user.tasks)
  assignedUsers: User[];
}
