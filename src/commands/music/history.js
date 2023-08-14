const { useQueue, useMainPlayer } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
     name: 'history',
     description: 'Xem lại lịch sử bài hát em đã hát',
     voiceChannel: true,

     callback: async (client, interaction) => {
          const queue = useQueue(interaction.guild);
          const player = useMainPlayer();

          if (!queue || queue.history.tracks.toArray().length == 0) return interaction.editReply({ content: `Không có bài nhạc nào đã phát trước đây....`, ephemeral: true });

          const tracks = queue.history.tracks.toArray();


          let description = tracks
               .slice(0, 20)
               .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url}) của ${track.author}` })
               .join('\r\n\r\n');

          let HistoryEmbed = new EmbedBuilder()
               .setAuthor({ name: `LỊCH SỬ HÀNG CHỜ ĐÃ PHÁT`, iconURL: interaction.user.avatarURL() })
               .setDescription(description)
               .setColor('#2f3136')
               .setTimestamp()
               .setFooter({ text: 'Âm nhạc đi trước - Tình yêu theo sau ❤️', iconURL: interaction.user.avatarURL({ dynamic: true }) })


          await interaction.editReply({ embeds: [HistoryEmbed] });

     },
}