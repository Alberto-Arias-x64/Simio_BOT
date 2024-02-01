/* eslint-disable no-useless-return */
// requirements
import { Collection, Events, Client, GatewayIntentBits, Partials } from 'discord.js'
import pingCommand from './commands/ping.js'
import 'dotenv/config'

// client
const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)]
})
client.setMaxListeners(0)

// set commands
client.commands = new Collection()
client.commands.set(pingCommand.data.name, pingCommand)

// contend
client.once(Events.ClientReady, (readyClient) => {
  console.log(`I'm ${readyClient.user.tag} and i'm ready`)
})

// register events
client.on(Events.MessageCreate, async interaction => {
  if (interaction.content === '/ping') {
    return interaction.reply({ content: '!!pong', target: { channel: interaction.channel.name } })
  }
})

client.on(Events.InteractionCreate, interaction => {
  console.log(interaction)
})

// connection
client.login(process.env.TOKEN)
