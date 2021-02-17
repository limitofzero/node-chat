import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public oldPassword: string;

  @IsNotEmpty()
  public newPassword: string;

  // todo check equals
  @IsNotEmpty()
  public repeatPassword: string;
}
