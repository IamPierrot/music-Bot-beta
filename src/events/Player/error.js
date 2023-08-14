const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {

    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: `Bot had an unexpected error, please check the console imminently!` })
        .setColor('#EE4B2B')
        .setTimestamp()

    queue.metadata.send({ embeds: [ErrorEmbed] , ephemeral: true}).then((msg) => msg.delete());

    console.log(`Error emitted from the Bot ${error.message}`);
}