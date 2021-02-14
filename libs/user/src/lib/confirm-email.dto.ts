import { IsEmail, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
