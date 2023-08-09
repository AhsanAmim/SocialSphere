import env from "dotenv"
env.config();
import mysql from "mysql"
console.log("db connected");
export const db = mysql.createConnection({
  host:"localhost",
  user:process.env.USER_NAME,
  password:process.env.USER_PASSWORD,
  database:process.env.DATABASE_NAME
})