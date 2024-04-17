import { TaskAssignment } from 'src/tasks/entities/task-assignment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'mydatabase',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  entities: [User, Task, TaskAssignment],
  synchronize: true,
};

export default config;
