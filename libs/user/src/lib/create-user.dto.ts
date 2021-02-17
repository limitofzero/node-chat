import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;
}
