import dotenv from 'dotenv';



const config = {
  init:()=>dotenv.config(),
  databaseUrl: process.env.DATABASE_URL || 'default_database_url',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};



export default config;
