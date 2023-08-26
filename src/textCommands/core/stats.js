const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const cpuStat = require("cpu-stat");

module.exports = {
     name: "stats",
     // aliases: ['stat', 'bot'],
     description: "Xem thông tin của bot",
     // usage: 'nqg stats',
     /**
      * 
      * @param {Discord.Client} client 
      * @param {Discord.Message} message 
      * @param {*} args 
      */
     callback: async (client, message, args) => {
          cpuStat.usagePercent(function (err, percent) {
               if (err) {
                    return console.log(err);
               }
               const cpuUsage = percent.toFixed(2);

               const duration = moment.duration(client.uptime).format(" D [ngày], H [giờ], m [phút], s [giây]");
               const botStatsEmbed = new Discord.EmbedBuilder()
                    .setTitle(`Thông Tin Về ${client.user.username}`)
                    .setColor("Random")
                    .addFields(
                         { name: `<a:9182galaxystar2:1131116746917556256> THÔNG TIN CỦA BOT \n > <a:NQG_muiten6:1129818502044323841> Prefix: \`${prefix}\``, value: ' > **<a:NQG_muiten6:1129818502044323841> Owner:** `Cá và Hàu`', inline: false },
                         { name: `> <a:NQG_muiten6:1129818502044323841> Số lượng máy chủ: \`${client.guilds.cache.size}\``, value: `> **<a:NQG_muiten6:1129818502044323841> Số lượng kênh**: \`${client.channels.cache.size}\``, inline: false },
                         { name: '> <a:NQG_muiten6:1129818502044323841> Categories:`5`', value: `> **<a:NQG_muiten6:1129818502044323841> Số lượng lệnh:** \`${1}\``, inline: false },
                         { name: `<a:8785galaxystar:1131116698192318495> CHỈ SỐ CỦA BOT \n > <a:NQG_muiten5:1129818541042966529> Sử dụng CPU: \`${cpuUsage}%\``, value: `> <a:NQG_muiten5:1129818541042966529> **Sử dụng Ram:** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, inline: false },
                         { name: `> <a:NQG_muiten5:1129818541042966529> Hệ thống: \`${os.arch()}\``, value: `> **<a:NQG_muiten5:1129818541042966529> Nền tảng:** \`${os.platform()}\``, inline: false },
                         { name: `> <a:NQG_muiten5:1129818541042966529> Thư viện: \`Discord.js\``, value: `> **<a:NQG_muiten5:1129818541042966529> Phiên bản thư viện:** \`v${Discord.version}\``, inline: false },
                         { name: `> <a:NQG_muiten5:1129818541042966529> Phiên bản node: \`${process.version}\``, value: `> **<a:NQG_muiten5:1129818541042966529> Thời gian hoạt động:** \`${duration}\``, inline: false },
                    )
                    .addFields([
                         {
                              name: "<a:NQG_pinkmail:1131118262822907925> Giới thiệu về dàn loli nhạc siêu cấp vjp pro",
                              value: "Tôi ăn cắp code của bot NeyuQ Gang"
                         }
                    ])
                    .setThumbnail(`${client.user.avatarURL()}`)
               message.channel.send({ embeds: [botStatsEmbed] });
          });
     },
}; 
