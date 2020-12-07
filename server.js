const express = require('express');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
//data coming from db is to be part of hashed informaiton
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
//regardless of what you name the session library, req always has a property of session so whatever you name it it will always be req.session
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});