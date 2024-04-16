import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => User)
  @JoinTable()
  assignedUsers: User[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
