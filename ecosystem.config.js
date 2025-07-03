// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "nextjs-app",
        script: "node_modules/next/dist/bin/next",
        args: "start",
        instances: 1, // ou 'max' para modo cluster
        exec_mode: "fork", // ou 'cluster'
        env: {
            NODE_ENV: "production",
            PORT: 3000
        }
      }
    ]
  };
  