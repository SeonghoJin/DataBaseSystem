import dotenv from 'dotenv';
var envs = dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (envs.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export var config = {
    port: process.env.PORT,
    session_secret: process.env.SESSION_SECRET,
    MAIN_URI: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''),
    DB_HOST: process.env.DB_HOST,
    DB_PROT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
};
export var DBconfig = {
    port: "3306",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
};
