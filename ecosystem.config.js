module.exports = {
    apps: [{
        name: 'server',
        script: './index.js',
        out_file: './logs/pm2/console.log',
        time: false,
        // args: 'one two',
        //autorestart: true,
        watch: false,
        env: {
            NODE_ENV: 'development',
            // NODE_ENV: 'production',
            PORT: 3010
        },
        // env_production: {
        //   NODE_ENV: 'production'
        // }
    }],
};
