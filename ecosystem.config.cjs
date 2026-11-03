// PM2 - DiskMize web (producción en CloudPanel)
// Uso: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "diskmize-web",
      script: "server.js",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3102,            // App Port configurado en CloudPanel
        HOSTNAME: "127.0.0.1", // solo localhost; el público lo sirve nginx
      },
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
