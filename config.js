module.exports = {
    node: process.env.NODE_ENV || 'dev',
    postgres: {
        user: 'postgres',
        host: 'localhost',
        database: 'teldirect',
        password: 'postgres',
        port: 5432, 
    },
    server: {
        host: 'localhost',
        port: 3000,
    }

}