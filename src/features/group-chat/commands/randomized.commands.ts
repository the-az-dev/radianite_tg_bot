import { Telegraf } from "telegraf";
import {
  maximumMMRPoints,
  minimumMMRPoints,
  mmrDownMessageGroup,
  mmrProbability,
  mmrUpMessageGroup,
  noMMRMessageGroup,
  startMatchNo,
  startMatchYes,
  usersMMRMessageGroup,
  yes_noMatchProbability,
  yesMatchDefaultMax,
  yesMatchNightMax,
  yesMatchNightMin,
  zeroMMRProbality,
} from "../../../shared/constants";
import { userRepository } from "../../../shared/repositories";
import User from "../../../shared/entity/user.entity";

export default class RandomizedCommands {
  constructor(private bot: Telegraf) {
    this.bot.command("start_match_or_not", this.startGame);
    this.bot.command("my_mmr", this.showMMR);
    this.bot.command("get_mmr", this.getMMR);
  }
  getMMR = async (ctx) => {
    const newMMR = this.getMMRNumber(minimumMMRPoints, maximumMMRPoints);
    const chatId = ctx.chat.id;
    const messageId = ctx.message.message_id;

    const currUser = await userRepository.findOneBy({ userId: ctx.from.id });

    if(currUser === null) return ctx.reply("Використай команду /reg аби додатись до системи 😉");
    const mmr = currUser.mmr === null ? 0 : currUser.mmr;
    currUser.mmr = Number(mmr) + Number(newMMR);
    currUser.updatedMmrAt = new Date();

    if (newMMR === 0)
      return ctx.telegram.sendMessage(
        chatId,
        noMMRMessageGroup
          .replace("{total_points}", `${currUser.totalMMR}`)
          .replace("{refresh_time}", "24h"),
        {
          parse_mode: "HTML",
          reply_to_message_id: messageId,
        }
      );

    ctx.telegram.sendMessage(
      chatId,
      newMMR < 0
        ? mmrDownMessageGroup
            .replace("{mmr_number}", String(newMMR * -1))
            .replace("{total_points}", `${currUser.totalMMR}`)
            .replace("{refresh_time}", "24h")
        : mmrUpMessageGroup
            .replace("{mmr_number}", String(newMMR))
            .replace("{total_points}", `${currUser.totalMMR}`)
            .replace("{refresh_time}", "24h"),
      {
        parse_mode: "HTML",
        reply_to_message_id: messageId,
      }
    );

    await userRepository.save(currUser);
  };

  showMMR = async (ctx) => {
    const chatId = ctx.chat.id;
    const messageId = ctx.message.message_id;

    const currUser: User = await userRepository.findOneBy({ userId: ctx.from.id });

    if(currUser === null) return ctx.reply("Використай команду /reg аби додатись до системи 😉");

    ctx.telegram.sendMessage(
      chatId,
      usersMMRMessageGroup.replace("{total_points}", `${currUser.totalMMR}`),
      {
        parse_mode: "HTML",
        reply_to_message_id: messageId,
      }
    );
  };

  startGame = async (ctx) => {
    const chatId = ctx.chat.id;
    const messageId = ctx.message.message_id;
    ctx.telegram.sendMessage(
      chatId,
      this.getRandomDrop() === 0 ? startMatchNo : startMatchYes,
      {
        parse_mode: "HTML",
        reply_to_message_id: messageId,
      }
    );
  };

  private getMMRNumber(min: number, max: number): number {
    if (Math.random() < zeroMMRProbality) {
      return 0;
    }

    return this.getBiasedRandomNonZeroUniversal(min, max);
  }

  private getBiasedRandomNonZeroUniversal(min: number, max: number): number {
    let num = 0;

    do {
      const sign = Math.random() < mmrProbability ? -1 : 1;

      if (sign === -1 && min < 0) {
        // Мінус: діапазон [min, -1] ближче до min
        const negMin = min;
        const negMax = Math.min(-1, max < 0 ? max : -1);
        const delta = Math.abs(negMax - negMin);
        const errorFactor = 0.25 + Math.random() * 0.25; // 10–15%
        num = Math.floor(negMin + delta * errorFactor);
      } else if (sign === 1 && max > 0) {
        // Плюс: діапазон [10, max]
        const posMin = Math.max(10, min > 0 ? min : 10);
        const posMax = max;
        if (posMin > posMax) {
          // Якщо немає нормального плюс-діапазону — fallback
          num = 1;
        } else {
          num = Math.floor(Math.random() * (posMax - posMin + 1)) + posMin;
        }
      } else {
        // Якщо обраний знак не можливий — міняємо його
        num = sign === -1 ? 1 : -1;
      }
    } while (num === 0);

    return num;
  }

  private isNight(): boolean {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 6;
  }

  private getRandomProbability(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  private getRandomDrop(): number {
    const night = this.isNight();
    let probability = yes_noMatchProbability; // дефолтна ймовірність 50%

    if (night) {
      probability = this.getRandomProbability(
        yesMatchNightMin,
        yesMatchNightMax
      );
    } else {
      probability = this.getRandomProbability(
        yesMatchNightMin,
        yesMatchDefaultMax
      );
    }

    // Генеруємо випадкове число від 0 до 1
    const rand = Math.random();

    return rand < probability ? 1 : 0;
  }
}
