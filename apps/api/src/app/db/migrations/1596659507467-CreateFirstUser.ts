import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/user";

export class CreateFirstUser1596659507467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.email = "test@mail.ru";
    user.password = "password";
    user.hashPassword();
    user.username = "admin";
    user.isConfirmed = true;
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
