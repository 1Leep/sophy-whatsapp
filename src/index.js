const wa = require('@open-wa/wa-automate');
const start = require('./start.js');

wa.create({
  sessionId: "sophy",
  multiDevice: true, 
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'pt-br',
  logConsole: false,
  qrTimeout: 0,
}).then(client => start(client));

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
