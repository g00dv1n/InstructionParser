/**
 * Created by g00dv1n on 24.10.16.
 */
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lockers');

module.exports = mongoose;