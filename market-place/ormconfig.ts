import { Faq } from "src/entities/faq.entity";
import { User } from "src/entities/user.entity";
import { UserQuestion } from "src/entities/userquestion.entity";
import { Template } from "src/entities/template.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Download } from "src/entities/download.entity";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "MP",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '202122',
    entities: [User,Faq,UserQuestion,Template,Download],
    synchronize: true
}

export default config;