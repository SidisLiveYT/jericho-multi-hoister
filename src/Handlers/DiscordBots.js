const Discord = require('discord.js')

class DiscordClientBatch {
  constructor(DiscordBotsArray = [], StoreCacheBoolean = false) {
    this.raw = DiscordBotsArray
    this.StoreCacheBoolean = StoreCacheBoolean
    this.ClientCache = {}
  }
  async fetch(DiscordBotsArray = [], StoreCacheBoolean = false) {
    if (
      DiscordBotsArray &&
      Array.isArray(DiscordBotsArray) &&
      DiscordBotsArray[0]
    ) {
      const SavedCacheArray = await Promise.all(
        DiscordBotsArray.map(async (BotCache) => {
          try {
            if (!BotCache.token)
              return void TypeError(`Invalid Bot Token is Detected`)
            const Tempclient = new Discord.Client({
              intents: [
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.GUILD_BANS,
                Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
                Discord.Intents.FLAGS.GUILD_WEBHOOKS,
                Discord.Intents.FLAGS.GUILD_INVITES,
                Discord.Intents.FLAGS.GUILD_VOICE_STATES,
                Discord.Intents.FLAGS.DIRECT_MESSAGES,
                Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
              ],
              restTimeOffset: 0,
              partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
              ...BotCache.options,
            })

            BotCache.events && BotCache.events.ready
              ? Tempclient.on('ready', () => {
                  console.log(
                    typeof BotCache.events.ready === 'string'
                      ? `${Tempclient.user.username}:${Tempclient.user.id} | ${BotCache.events.ready}`
                      : `${Tempclient.user.username} Logged in Discord API`,
                  )
                })
              : undefined
              
            Tempclient.login(BotCache.token)
            StoreCacheBoolean
              ? (this.ClientCache[`${Tempclient.user.id}`] = Tempclient)
              : undefined
            return Tempclient
          } catch (error) {
            if (BotCache.IgnoreError) return void null
            else return void SyntaxError(error.message ?? `${error}`)
          }
        }),
      )
      return SavedCacheArray
    }
    else return undefined
  }
}

module.exports = DiscordClientBatch
