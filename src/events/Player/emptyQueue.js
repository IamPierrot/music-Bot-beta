const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
     const emptyQueue = new EmbedBuilder()
          .setAuthor({ name: `Không còn yêu cầu gì để em hát cả 😭` })
          .setColor('DarkButNotBlack')

     queue.metadata.send({ embeds: [emptyQueue] });
}