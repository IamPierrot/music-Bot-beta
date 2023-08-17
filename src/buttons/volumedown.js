const { EmbedBuilder } = require('discord.js');

module.exports = async ({ interaction, queue }) => {
     const noMusic = new EmbedBuilder()
     .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
     if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic] });
     
     const maxVol = configure.opt.maxVol;
     const vol = Math.floor(queue.node.volume - 5)

     if (vol < 0) return interaction.reply({ content: `Bạn không thể cho mình hát quá thấp như zậy (○\｀ 3\′○)`, ephemeral: true })

     if (queue.node.volume === vol) return interaction.reply({ content: `Mình đang hát ở tầng âm này mà ＞︿＜`, ephemeral: true });

     const success = queue.node.setVolume(vol);

     return interaction.reply({ content: success ? `Mình đã chỉnh giọng hát xuống ${vol}/${maxVol}% 🔊 roài đó :3` : `Something went wrong ${interaction.member}... try again ? ❌`, ephemeral: true });
}