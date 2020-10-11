import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./src/auth/auth.module";
import { typeOrmConfig } from "./src/db/database-provider";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ]
})
export class AppModule {}