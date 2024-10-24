require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
// const Redis = require('ioredis'); // Import ioredis

const app = express();
const port = process.env.APP_PORT || 3000;

// Connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  }
);

// // Connect to Redis
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   db: process.env.REDIS_DB
// });

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user', (req, res) => {
  res.send({
    name: 'Baby corner corner',
    email: 'just dey play'
  });
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// // Test Redis connection
// redis.ping()
//   .then(() => console.log('Connected to Redis...'))
//   .catch(err => console.log('Redis Error: ' + err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
