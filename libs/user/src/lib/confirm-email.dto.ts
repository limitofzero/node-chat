import { IsEmail, IsNotEmpty } from "class-validator";

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
