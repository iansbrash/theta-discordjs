const token = require('./sensitive.js')
const axios = require('axios');
const jwt = require('jsonwebtoken');

const generateAccessToken = (discordId) => {
    return jwt.sign({id: discordId}, token, { expiresIn: '1h' });
}

module.exports = {
	name: 'genbeta',
	description: 'Generate beta key',
	async execute(message, args) {
        console.log(`User ${message.author.id} is trying to generate a beta key`)
        // console.log(message.client)

        // first check if user is actually in the discord server
        const userId = message.author.id

        const serverId = '863515350959521804' // message.guild.id
        // console.log(message.client.guilds)
        // console.log(Object.keys(message.client.guilds.cache)[0])
        // let guild = message.client.guilds.cache.get(Object.keys(message.client.guilds.cache)[0]) // serverId
        let guild = message.client.guilds.cache.get(serverId)
        // let guild2 = message.client.guilds.get(serverId)

        // console.log(guild)



        // if (message.channel.type !== 'dm') {
        //     return message.channel.send(`You're doing this in public?! I should revoke your key.`);
        // }

        const baseRequestUrl = 'https://uwaecaqreh.execute-api.us-east-1.amazonaws.com/Beta'

        if (!guild) {
            message.channel.send('Guild Error: Guild does not exist.')
        }
        else if (guild.members.cache.get(userId)) {
            const token = generateAccessToken(userId)
            // message.channel.send('You are in the Thaeta server!')
            // message.channel.send(token)
            try {
                const res = await axios({
                    method: 'post',
                    url: `${baseRequestUrl}/genbeta/discord`,
                    headers: {
                        discordId: userId,
                        token: token
                    }
                })
                return message.channel.send(res.headers.license)
            }
            catch (err) {
                console.log(err.response.status)
                console.log(err.response.data)

                return message.channel.send(`ERROR: ${err.response.data}`)

                
            }

        }
        else {
            guild.members.cache.forEach(member => {
                console.log(member.user.username)
            })
            message.channel.send('Generation Error: You are not a beta tester.')
        }
	},
};