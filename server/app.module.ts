import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./src/db/typeorm-config";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
    ]
})
export class AppModule {}