/**
 * 
 * @param {import('discord.js').Message} message 
 */

module.exports = async (client, message) => {
     const prefix = "?";

     if (message.author.bot || !message.content.startsWith(prefix)) return;

     const args = message.content.slice(prefix.length).trim().split(/ +/);
     const command = args.shift().toLowerCase();

     if (command === "lmao") await message.channel.send('hello');
}