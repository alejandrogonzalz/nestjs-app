import { UserRole } from './user-role.enum';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
}
