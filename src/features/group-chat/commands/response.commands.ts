
import { isGroup } from "../../../shared/utils";
import { userRepository } from "../../../shared/repositories";
import { chatFindId, needReplyMessage, notForFindThread } from "../../../shared/constants";
import { Telegraf } from "telegraf";

export default class ResponseCommands {
  constructor(private bot: Telegraf) {
    this.bot.command("stats", this.globalStats);
    this.bot.command("find", this.findPlayers);
    this.bot.command("info", this.playerInfo);
    this.bot.command("reg", this.registrationUser);
  }
  registrationUser = async (ctx) => {
    console.log(ctx.from);

    const currUser = await userRepository.findOneBy({ userId: ctx.from.id });

    if(currUser !== null) return ctx.reply("Тобі мало було пригод з Премʼєр? Ти вже в системі 🙃");
    
    const newUser = userRepository.create({
      userId: ctx.from.id,
      username: ctx.from.username,
      warningLimits: 3,
      reputation: 0,
      mmr: 0,
      updatedAt: new Date(),
      updatedMmrAt: new Date(),
    });
    await userRepository.save(newUser);

    ctx.reply("✅ Зареєстрував в системі 'Шлях'! З вас 5к зелених!")
  }
  playerInfo = async (ctx) => {
    const chatType = ctx.chat.type;
    if (!isGroup(chatType)) return;

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply("Шукати інфу про бота? Ти реально? Ну ок 🥸\nЯ Ультра_МЕГА_супер_дупер_рівер_прайм Радіант 3000 😈\nПитання? 🙃");

    console.log(ctx);

    ctx.reply("Я тобі не ФБР аби розказувати про тіпа. Не на того напав 🤬");
  };
  findPlayers = async (ctx) => {
    const chatType = ctx.chat.type;
    if (!isGroup(chatType)) return;
    if(ctx.message.message_thread_id !== chatFindId) return ctx.reply(notForFindThread);
    ctx.reply("Ріоти включать базу даних от і знайду!");
    
  };
  globalStats = async (ctx) => {
    const chatType = ctx.chat.type;
    if (!isGroup(chatType)) return;

    ctx.reply("- Ало 📞\n- Це СТБ?\n- Мене просять статистику, ви скинете?\n- Ага...\n- Супер! Дякую!\n\nСказали піти нахуй...");
  };
}
