import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifyUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
