const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {

     const Disconnect = new EmbedBuilder()
          .setAuthor({ name: `Ngắt kết nối với kênh voice! ❌` })
          .setColor('#2f3136')
          .setDescription("tam biet anh em! toi da het gia tri...");

     queue.metadata.send({ embeds: [Disconnect] });
}