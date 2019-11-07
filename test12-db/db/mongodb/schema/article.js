const mongoose = require('mongoose');

module.exports = ArticleSchema = new mongoose.Schema({
    title: { type: String, index: true },
    source: { type: String },
});