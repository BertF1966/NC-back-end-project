const db = require("../db/connection");

exports.fetchArticles = () => {
  return db
    .query(`SELECT * FROM articles;`)
    .then(({ rows }) => {
      return rows;
    });
};