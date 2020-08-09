import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import bcrypt from "bcrypt";

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

    public hashPassword(): void {
        // todo salt
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public isPasswordValid(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
