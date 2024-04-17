import { TaskStatus } from './task-status.enum';

export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly estimationHours: number;
  readonly deadline: string;
  readonly status: TaskStatus;
  readonly usersId: number[];
  readonly cost: number;
}
