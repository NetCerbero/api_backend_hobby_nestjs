import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";

export const DatabaseConfig = {
    TRANSACTION:{
        SERIALIZABLE:"SERIALIZABLE" as IsolationLevel
    }
}