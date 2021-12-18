require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express()
const port = process.env.PORT || 3333;
const sequelize = require('./config/connection');
const routes = require('./controller');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false })
.then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port} 🚀`);
  })
});