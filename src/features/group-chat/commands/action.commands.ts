import { userRepository } from "../../../shared/repositories";
import { deletingTime, welcomeMessageGroup } from "../../../shared/constants";
import { Telegraf } from "telegraf";

export default class ActionCommands {
  constructor(private bot: Telegraf) {
    this.bot.on("new_chat_members", this.newMember);
  }
  newMember = async (ctx) => {
    const newMembers = ctx.message.new_chat_members;

    for (const member of newMembers) {
      const userId = member.id;
      const username = member.username;

      const newUser = userRepository.create({
        userId: userId,
        username: username,
        warningLimits: 3,
        reputation: 0,
        mmr: 0,
        updatedAt: new Date(),
      });
      await userRepository.save(newUser);
    }

    const sent = await ctx.reply(welcomeMessageGroup, { parse_mode: "HTML" });
    // Автовидалення через 5 хвилин (300000 мс)
    setTimeout(() => {
      ctx.deleteMessage(sent.message_id).catch(console.error);
    }, deletingTime);
  };
}
