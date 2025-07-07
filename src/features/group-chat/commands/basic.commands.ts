import { Context, Telegraf } from "telegraf";
import { isGroup, isAdmin, parseDuration } from "../../../shared/utils";
import {
  adminOnlyMessage,
  banMessageGrop,
  banMessageUser,
  forrbidenToBotMessage,
  kickMessageGroup,
  kickMessageUser,
  muteMessageGroup,
  muteMessageUser,
  needFormatDateMessage,
  needReplyMessage,
  noDataContained,
  reportMessageAdmin,
  reportMessageUser,
  rulesMessageGroup,
  warnMessageGroup,
  warnMessageUser,
} from "../../../shared/constants";

export default class BasicCommands {
  constructor(private bot: Telegraf) {
    this.bot.command("rules", this.showRules);
    this.bot.command("report", this.showReport);
    this.bot.command("mute", this.mutePerson);
    this.bot.command("kick", this.kickPerson);
    this.bot.command("ban", this.banPerson);
    this.bot.command("warn", this.sendWarnToPerson);
    this.bot.command("unmute", this.unmutePerson);
    this.bot.command("unban", this.unbanPerson);
  }

  showReport = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);
    const chatIdStr = String(ctx.chat.id);
    const channelId = chatIdStr.startsWith("-100")
      ? chatIdStr.slice(4)
      : chatIdStr;
    const msgLink = `https://t.me/c/${channelId}/${replyTo.message_id}`;

    // Беремо всіх адмінів
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);

    // Фільтруємо ботів і власника
    const humanAdmins = admins.filter((a) => !a.user.is_bot);

    // Розсилаємо кожному адміна
    for (const admin of humanAdmins) {
      try {
        await ctx.telegram.sendMessage(
          admin.user.id,
          `🚨 Репорт!\nВідправник: <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>
Порушник: <a href="tg://user?id=${replyTo.from.id}">${replyTo.from.first_name}</a>
<a href="${msgLink}">🔗 Перейти до повідомлення</a>`,
          { parse_mode: "HTML", disable_web_page_preview: true }
        );
      } catch (err) {
        console.error(`Не вдалося написати адміна ${admin.user.first_name}:`, err);
      }
    }

    // Повідомляємо користувачу
    await ctx.reply(reportMessageUser);
  };
  showRules = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    const chatId = ctx.chat.id;
    const messageId = ctx.message.message_id;

    await ctx.telegram.sendMessage(chatId, rulesMessageGroup, {
      reply_to_message_id: messageId,
    });
  };

  mutePerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    const [_, durationStr, ...reasonArr] = ctx.message.text.split(" ");
    const duration = parseDuration(durationStr);
    if (!duration) return ctx.reply(needFormatDateMessage);

    const reason = reasonArr.join(" ") || noDataContained;
    const untilDate = Math.floor(Date.now() / 1000) + duration;

    await ctx.telegram.restrictChatMember(ctx.chat.id, replyTo.from.id, {
      permissions: {
        can_send_messages: false,
        can_send_media_messages: false,
        can_send_polls: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false,
        can_invite_users: false,
        can_pin_messages: false,
      },
      until_date: untilDate,
    });

    await ctx.reply(
      muteMessageGroup
        .replace("{message_link}", replyTo.from.id)
        .replace("{duration}", durationStr)
        .replace("{reason}", reason),
      { parse_mode: "HTML" }
    );
    ctx.telegram.sendMessage(
      replyTo.from.id,
      muteMessageUser
        .replace("{duration}", durationStr)
        .replace("{reason}", reason)
        .replace(
          "{message_link}",
          `${String(ctx.chat.id).substring(4)}/${replyTo.message_id}`
        ),
      { parse_mode: "HTML" }
    );
  };
  kickPerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    const [_, ...reasonArr] = ctx.message.text.split(" ");
    const reason = reasonArr.join(" ") || noDataContained;

    await ctx.telegram.kickChatMember(ctx.chat.id, replyTo.from.id);
    await ctx.telegram.unbanChatMember(ctx.chat.id, replyTo.from.id);

    await ctx.reply(
      kickMessageGroup
        .replace("{message_link}", replyTo.from.id)
        .replace("{reason}", reason),
      { parse_mode: "HTML" }
    );
    ctx.telegram.sendMessage(
      replyTo.from.id,
      kickMessageUser.replace("{reason}", reason),
      { parse_mode: "HTML" }
    );
  };
  banPerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    const [_, durationStr, ...reasonArr] = ctx.message.text.split(" ");
    const duration = parseDuration(durationStr);
    if (!duration) return ctx.reply(needFormatDateMessage);

    const untilDate = Math.floor(Date.now() / 1000) + duration;
    const reason = reasonArr.join(" ") || noDataContained;

    await ctx.telegram.banChatMember(ctx.chat.id, replyTo.from.id, untilDate);

    await ctx.reply(
      banMessageGrop
        .replace("{message_link}", replyTo.from.id)
        .replace("{reason}", reason),
      { parse_mode: "HTML" }
    );

    ctx.telegram.sendMessage(
      replyTo.from.id,
      banMessageUser
        .replace("{duration}", durationStr)
        .replace("{reason}", reason),
      { parse_mode: "HTML" }
    );
  };
  sendWarnToPerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    const [_, ...reasonArr] = ctx.message.text.split(" ");
    const reason = reasonArr.join(" ") || noDataContained;

    // Тут можна зберегти в БД
    await ctx.reply(
      warnMessageGroup
        .replace("{message_link}", replyTo.from.id)
        .replace("{reason}", reason),
      { parse_mode: "HTML" }
    );

    ctx.telegram.sendMessage(
      replyTo.from.id,
      warnMessageUser
        .replaceAll("{reason}", reason)
        .replace(
          "{message_link}",
          `${String(ctx.chat.id).substring(4)}/${replyTo.message_id}`
        ),
      { parse_mode: "HTML" }
    );
  };
  unmutePerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    await ctx.telegram.restrictChatMember(ctx.chat.id, replyTo.from.id, {
      permissions: {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
        can_invite_users: true,
        can_pin_messages: true,
      },
    });

    const log = await ctx.reply(
      `🔊 <a href="tg://user?id=${replyTo.from.id}">Розмучений</a>`,
      { parse_mode: "HTML" }
    );
  };
  unbanPerson = async (ctx) => {
    if (!isGroup(ctx.chat.type)) return;
    if (!isAdmin(await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)))
      return ctx.reply(adminOnlyMessage);

    const replyTo = ctx.message.reply_to_message;
    if (!replyTo) return ctx.reply(needReplyMessage);

    if (replyTo.from.id === ctx.botInfo.id)
      return ctx.reply(forrbidenToBotMessage);

    await ctx.telegram.unbanChatMember(ctx.chat.id, replyTo.from.id);

    await ctx.reply(
      `✅ <a href="tg://user?id=${replyTo.from.id}">Розбанений</a>`,
      { parse_mode: "HTML" }
    );
  };
}
