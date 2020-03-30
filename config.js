require('dotenv').config();
var convict = require('convict');
// Define a schema
var config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT'
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'localhost',
            env: 'DB_HOST'
        },
        port: {
            doc: 'The database port.',
            format: 'port',
            default: 27017,
            env: 'PORT'
        },
        pool: {
            doc: "Pool size for Mongo connections",
            format: 'int',
            default: 4
        },
        username: {
            doc: 'Database username',
            format: '*',
            default: '',
            env: 'DB_USER',
            sensitive: true
        },
        pass: {
            doc: 'Database password',
            format: '*',
            default: '',
            env: 'DB_PASS',
            sensitive: true
        },
        name: {
            doc: 'Database name',
            format: String,
            default: ''
        }
    },
    logs: {
        level: {
            doc: 'Predefined Formats (Morgan)',
            format: ['combined', 'common', 'dev', 'short', 'tiny'],
            default: 'dev'
        }
    },
    security: {
        jwtSecret: {
            doc: 'Secret Token (JWT)',
            format: '*',
            default: '',
            env: 'SECRET_TOKEN',
            sensitive: true
        },
        jwtTokenExp: {
            doc: "Token expiration time (hours)",
            format: 'int',
            default: 6
        },
        bcryptSalt:  {
            doc: "Generate Salt (bcrypt)",
            format: 'int',
            default: 10
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile(`./config/${env}.json`);

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
