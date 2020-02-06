const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

db.sequelize.sync()
  .then(() => {
    console.log('mysql connected');
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })