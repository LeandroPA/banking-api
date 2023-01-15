let mongoose = require('mongoose');

const DB_URL = process.env.DOCK_CLIENT_DB_URL;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
    console.log(DB_URL);
     mongoose.connect(DB_URL)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error', err)
       })
  }
}

module.exports = new Database()