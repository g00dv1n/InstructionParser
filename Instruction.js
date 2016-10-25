/**
 * Created by g00dv1n on 24.10.16.
 */

let mongoose = require('./db');

let inst = mongoose.Schema({
    plainText: String,
    htmlText: String,
    family: String,
    originalName: String
});




module.exports = mongoose.model('Instruction', inst);
