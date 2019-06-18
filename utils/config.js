const path = require('path');
const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

const getWithDefault = (property, defaultValue) => config.has(property) ? config.get(property) : defaultValue;

const ENV = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || getWithDefault('server.port', 3000);
const HOSTNAME = process.env.HOSTNAME || getWithDefault('server.hostname', 'localhost');

const PROJECT_DIR = process.cwd();
const SOURCE_DIR = path.resolve(PROJECT_DIR, 'src');
const BUNDLE_DIR = path.resolve(PROJECT_DIR, 'dist');

module.exports = {
	ENV,
	PORT,
	HOSTNAME,
	PROJECT_DIR,
	SOURCE_DIR,
	BUNDLE_DIR
};