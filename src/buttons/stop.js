const { EmbedBuilder } = require('discord.js');

module.exports = async ({ interaction, queue }) => {

     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

     if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic] });
     
     queue.delete();

     const stopEmbed = new EmbedBuilder()
          .setColor('#b72563')
          .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: interaction.user.avatarURL() })

     await interaction.reply({ embeds: [stopEmbed] });

}