const { useMainPlayer } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = async ({ interaction, queue }) => {
     const player = useMainPlayer();

     if (!queue.isPlaying() || !queue) {
          await interaction.editReply({ content: "Không có bài nhạc nào đang phát...." });
     }
     const track = queue.currentTrack;
     const playedCommand = new Set();
     playedCommand.add(track.requestedBy.id);

     if (playedCommand.has(interaction.user.id)) {
          queue.delete();

          const stopEmbed = new EmbedBuilder()
               .setColor('#b72563')
               .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: interaction.user.avatarURL() })
     
          await interaction.editReply({ embeds: [stopEmbed] });
     } else {
          await interaction.editReply({
               embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(
                         `❌ Người yêu cầu bài này là :${track.requestedBy.toString()}\n❌ Không thể dừng!!`)]
          });

     }
   
}