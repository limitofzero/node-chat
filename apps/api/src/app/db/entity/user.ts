import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { compareSync, hashSync } from "bcrypt";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public username: string;

  @Column({ length: 150 })
  public email: string;

  @Column()
  public password: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public isConfirmed: boolean;

  public hashPassword(): void {
    // todo salt
    this.password = hashSync(this.password, 8);
  }

  public isPasswordValid(password: string): boolean {
    return compareSync(password, this.password);
  }
}
