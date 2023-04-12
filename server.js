const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();
const http = require('http');
const server = http.createServer(app);
const helpers = require('./utils/helpers');
const routes = require('./controllers');

const mysql = require('mysql2');
const path = require('path');
const router = require('./router');

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({ helpers });
app.use(session({
    secret : 'secret123',
    resave : true,
    saveUninitialized : true
}));

app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(routes)
app.use('/', router);
  
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port localhost:3001`);
  });
}).catch((err) => {
  console.error('Error syncing sequelize:', err);
});
