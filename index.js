require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const Redis = require('ioredis'); // Import ioredis

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

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);

// // Sync all models that are not already in the database
sequelize.sync({alter: true})
  .then(() => console.log('Models synced...'))
  .catch(err => console.log('Error: ' + err));

// // Connect to Redis
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB
});

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user/add', async (req, res) => {
  const user = await User.create({
    firstName: 'John',
    lastName: 'Doe'
  });
  res.json(user);
});

app.get('/user', async (req, res) => {
  const user = await User.findAll();
  res.json(user);
});

// // Test Redis connection
redis.ping()
  .then(() => console.log('Connected to Redis...'))
  .catch(err => console.log('Redis Error: ' + err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
