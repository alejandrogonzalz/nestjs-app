import { UserRole } from './user-role.enum';

export class TaskCompletionUser {
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  private _taskCompletion: number;
  private _totalTasks: number;
  private _completionRatio: number;

  constructor(name: string, email: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.role = role;
    this._taskCompletion = 0;
    this._totalTasks = 0;
  }

  incrementTaskCompletion(): void {
    this._taskCompletion++;
  }

  incrementTotalTasks(): void {
    this._totalTasks++;
  }

  calculateCompletionRatio(): void {
    if (this._totalTasks === 0) {
      this._completionRatio = 0;
    } else {
      this._completionRatio = this._taskCompletion / this._totalTasks;
    }
  }

  get taskCompletion(): number {
    return this._taskCompletion;
  }

  get totalTasks(): number {
    return this._totalTasks;
  }

  get completionRatio(): number {
    return this._completionRatio;
  }
}

export interface TaskCompletionUserDTO {
  name: string;
  email: string;
  completionRatio: number;
  completedTasks: number;
  totalTasks: number;
}
