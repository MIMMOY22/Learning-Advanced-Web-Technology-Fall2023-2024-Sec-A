import { Faq } from "src/entites/faq.entity";
import { User } from "src/entites/user.entity";
import { UserQuestion } from "src/entites/userquestion.entity";

import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";


const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "labtask",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '202122',
    entities: [User,Faq,UserQuestion],
    synchronize: true
}

export default config;