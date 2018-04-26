const path = require('path');
const rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

module.exports = {
	development: {
		rootPath: rootPath,
		database: 'mongodb://ofek:224496@ds245805.mlab.com:45805/ofekproject',
		port: process.env.PORT || 8000
	},
	production: {
		rootPath: rootPath,
		database: '',
		port: process.env.PORT || 80
	}
};