const express = require('express');
const statics = express.Router();

statics.use('/public', express.static(__dirname + './../public')) /*Asset  */
statics.use('/dist', express.static(__dirname + './../node_modules/bootstrap/dist')) /* Bootstrap */
statics.use('/bootstrap-icons', express.static(__dirname + './../node_modules/bootstrap-icons/font')) /* Bootstrap Icon */

module.exports = statics