const DiscordClientClass = require('./Handlers/DiscordBots.js')

class Hoister {
  constructor() {}
  async discord(DiscordBots = [], StoreCacheBoolean, Timeout = 0) {
    var DeployResultCache = {}
    if (DiscordBots && Array.isArray(DiscordBots)) {
      var DiscordBotClient = new DiscordClientClass(
        DiscordBots,
        StoreCacheBoolean,
      )
      DeployResultCache.DiscordBotsCache = await DiscordBotClient.fetch()
      DeployResultCache.DiscordBotClient = DiscordBotClient
      return DeployResultCache
    } else return undefined
  }
  async node() {}
}

module.exports = { Hoister }
