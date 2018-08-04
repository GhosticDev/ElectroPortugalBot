const Discord = require('discord.js');

const client = new Discord.Client();

client.on("ready", () => {
	console.log("--------------------------------------------\nBot on with " + client.users.size + " users and " + client.guilds.size + " servers!\n--------------------------------------------");
	client.channels.get('475399952735010837').send("ola");
});

client.login(process.env.TOKEN);
