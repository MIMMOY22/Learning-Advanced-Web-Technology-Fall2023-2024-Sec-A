import { Faq } from "src/entities/faq.entity";
import { User } from "src/entities/user.entity";
import { UserQuestion } from "src/entities/userquestion.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "MP",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '202122',
    entities: [User,Faq,UserQuestion],
    synchronize: true
}

export default config;