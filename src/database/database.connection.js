import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const {Pool} = pg;

const configDatabase = {
    connectionString: process.env.DATABASE_URL
    }

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);

/* db.connect((error, client, done) => {
    if(error){
        console.error('Error connecting to PostgresSQL', error);
    }else{
        console.log('-------- Connecting to PostgresSQL');
        done();
    }
}) */

