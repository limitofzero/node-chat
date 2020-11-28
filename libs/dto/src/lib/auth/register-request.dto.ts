import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterRequestDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: "Password is too short"
  })
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  recaptcha: string;
}
