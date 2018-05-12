//instantiate environment variables
require('dotenv').config();

//Make this global to use all over the application
CONFIG = {}

CONFIG.app = process.env.APP || 'development';
CONFIG.port = process.env.PORT || '8000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_host = process.env.DB_HOST || '@ds245805.mlab.com';
CONFIG.db_port = process.env.DB_PORT || '45805';
CONFIG.db_name = process.env.DB_NAME || 'ofekproject';
CONFIG.db_user = process.env.DB_USER || 'ofek';
CONFIG.db_password = process.env.DB_PASSWORD || '224496';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'Adfkj04cv!@#cv';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';