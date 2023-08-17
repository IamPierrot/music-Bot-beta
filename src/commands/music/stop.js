const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
     name: 'stop',
     description: 'cho em cook khỏi voice',
     deleted: false,
     voiceChannel: true,

     callback: async (client, interaction) => {
          const queue = useQueue(interaction.guild);
          
          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

          if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic], ephemeral: true });

          queue.delete();

          const stopEmbed = new EmbedBuilder()
               .setColor('#b72563')
               .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: interaction.user.avatarURL() })

          await interaction.reply({ embeds: [stopEmbed] });

     },
}