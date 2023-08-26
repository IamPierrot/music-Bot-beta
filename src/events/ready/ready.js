const { ActivityType } = require('discord.js');

let status = [
     {
          name: 'Youtube 🎧',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
     {
          name: 'Spotify 🎧',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
     {
          name: 'soundCloud 🎧',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
];

module.exports = (client) => {
     setTimeout(() => {
          console.log(`✔ Sucessfully logged into ${client.user.tag}!.`);
          setInterval(() => {
               let random = Math.floor(Math.random() * status.length);
               client.user.setActivity(status[random]);
          }, 10000)
     }, 1000);

};