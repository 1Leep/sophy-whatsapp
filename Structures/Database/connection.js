const { mongoUrl } = require('../../src/settings.json');
const mongoose = require('mongoose');
const app = mongoose.connection;

const connect = () => mongoose.connect(mongoUrl,{
 useNewUrlParser: true,
 useUnifiedTopology: true
});

app.on('error', () => mongoose.disconnect());
app.on('disconnected', () => connect());
app.on('open', () => console.log('[Database] Connected'));

connect();

