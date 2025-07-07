import {
  mmrCountingCoef,
  needReplyMessage,
  randomBonus,
  reputationCooldown,
} from "../../../shared/constants";
import { isGroup } from "../../../shared/utils";
import { Telegraf } from "telegraf";
import { userRepository } from "../../../shared/repositories";

export default class ReputationCommands {
  constructor(private bot: Telegraf) {
    this.bot.hears(/^\+rep( .*)?/, this.addReputation);
    this.bot.hears(/^\-rep( .*)?/, this.divideReputation);
  }
  divideReputation = async (ctx) => {
    const chatType = ctx.chat.type;
    if (!isGroup(chatType)) return;
    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) {
      return ctx.reply(needReplyMessage);
    }

    if (replyTo.from.id === ctx.from.id)
      return ctx.reply("Зняти в самого себе? 😳 Ну окей... Вжух 🪄");

    const userId = replyTo.from.id;

    const currUser = await userRepository.findOneBy({ userId: userId });

    if(currUser === null || currUser === undefined) ctx.reply("Використай команду /reg аби додатись до системи 😉")

    const now = new Date();
    const diffInMs = now.getTime() - currUser.updatedAt.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= reputationCooldown && currUser.reputation !== 0) {
      return ctx.reply("Цей юзер вже має оновлену репутацію!");
    }

    if (currUser.reputation === 0)
      return ctx.reply("Куди вже далі понижати коли й так 0? 🤣");

    currUser.reputation = currUser.reputation - 5;
    if (currUser.reputation <= 0) currUser.mmr_rep = 0;
    else
      currUser.mmr_rep =
        currUser.mmr_rep + (mmrCountingCoef * currUser.reputation) + randomBonus;
    currUser.updatedAt = new Date();

    await userRepository.save(currUser);

    ctx.reply(`📉 Зняв репутацію у @${replyTo.from.username || userId}`);
  };
  addReputation = async (ctx) => {
    const chatType = ctx.chat.type;
    if (!isGroup(chatType)) return;
    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) {
      return ctx.reply(needReplyMessage);
    }

    if (replyTo.from.id === ctx.from.id) return ctx.reply("Ото вже нарцис 😁");

    const userId = replyTo.from.id;

    const currUser = await userRepository.findOneBy({ userId: userId });

    if(currUser === null || currUser === undefined) ctx.reply("Використай команду /reg аби додатись до системи 😉")

    const now = new Date();
    const diffInMs = now.getTime() - currUser.updatedAt.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= reputationCooldown && currUser.reputation !== 0) {
      return ctx.reply("Цей юзер вже має оновлену репутацію!");
    }

    currUser.reputation = currUser.reputation + 5;
    currUser.mmr_rep =
      currUser.mmr_rep + (mmrCountingCoef * currUser.reputation) + randomBonus;
    currUser.updatedAt = new Date();

    await userRepository.save(currUser);

    ctx.reply(`📈 Підняв репутацію для @${replyTo.from.username || userId}`);
  };
}
