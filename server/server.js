const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { createTable } = require('./db');
const projectsRouter = require('./routes/projects');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/projects', express.static(path.join(__dirname, 'routes', 'projects')));
app.use('/uploads', express.static('uploads'));


app.use(morgan('dev'));
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use(cors({ 
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
}));

createTable()
  .then(() => {

    app.use('/projects', projectsRouter);

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка при запуске сервера:', error);
  });
