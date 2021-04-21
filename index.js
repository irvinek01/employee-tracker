const DB = require('./db');
const CMS = require('./lib/cms');

const db = new DB();
const cms = new CMS(db);
cms.start();