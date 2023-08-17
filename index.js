// require('events').EventEmitter.prototype._maxListeners = 100;
const { Client, Partials , GatewayIntentBits} = require('discord.js');
const eventHandlers = require('./src/handlers/eventHandler.js');
const playerHandlers = require('./src/handlers/playerHandler.js');
const { Player } = require('discord-player');

global.configure = require('./config.json');


const client = new Client({
     intents: [
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildVoiceStates,
     ],
     partials: [
          Partials.Channel,
          Partials.Message,
          Partials.User,
          Partials.GuildMember
     ],
     disbleMentions: 'everyone',
});

const player = new Player(client, configure.opt.discordPlayer);
player.extractors.loadDefault();
eventHandlers(client); //handler the events
playerHandlers(player);


client.login(configure.app.token);