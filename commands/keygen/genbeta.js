// const client = require('../../index.js');

module.exports = {
	name: 'genbeta',
	description: 'Generate beta key',
	execute(message, args) {
        console.log(`User ${message.author.id} is trying to generate a beta key`)
        // console.log(message.client)

        // first check if user is actually in the discord server
        const userId = message.author.id

        const serverId = '863515350959521804' // message.guild.id
        // console.log(message.client.guilds)
        // console.log(Object.keys(message.client.guilds.cache)[0])
        // let guild = message.client.guilds.cache.get(Object.keys(message.client.guilds.cache)[0]) // serverId
        let guild = message.client.guilds.cache.get(serverId)
        console.log(guild)

        if (message.channel.type !== 'dm') {
            return message.channel.send(`You're doing this in public?! I should revoke your key.`);
        }

        if (!guild) {
            message.channel.send('wtf guild dont exist')
        }
        else if (guild.members.cache.get(userId)) {
            message.channel.send('Yore in the guild')
        }
        else {
            message.channel.send('ur not in the guild')
        }
	},
};