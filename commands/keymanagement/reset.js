const axios = require('axios');

module.exports = {
	name: 'reset',
	description: 'Reset license key',
	async execute(message, args) {
        console.log(args)
        const userId = message.author.id

        const baseRequestUrl = 'https://uwaecaqreh.execute-api.us-east-1.amazonaws.com/Beta'

        if (args.length !== 0) {
            console.log(`User ${message.author.id} is trying to reset key ${args[0]}`)
            try {
                const res = await axios({
                    method: 'post',
                    url: `${baseRequestUrl}/auth/reset`,
                    headers: {
                        license: args[0]
                    }
                })

                return message.channel.send("Successfully reset license key!")
            }
            catch (err) {
                if (err.response.status == 404) {
                    return message.channel.send("ERROR: License key does not exist")
                }
                else {
                    return message.channel.send("ERROR: Unknown reset error")
                }
            }
        }
        else {
            return message.channel.send("ERROR: No license key provided")
        }
	},
};