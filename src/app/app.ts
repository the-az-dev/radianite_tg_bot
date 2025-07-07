import { Telegraf } from "telegraf";
import { GroupChat } from "../features";
import { MySQLDataSource } from "../shared/mysql.datasource";

export function runApp(token) {
  MySQLDataSource.initialize()
    .then(() => {
      console.log(`[${new Date()}] \t | \t ORM Intitialized`);
      const bot = new Telegraf(token);

      new GroupChat.ReputationCommands(bot);
      new GroupChat.ActionCommands(bot);
      new GroupChat.BasicCommands(bot);
      new GroupChat.ResponseCommands(bot);
      new GroupChat.RandomizedCommands(bot);

      bot.launch();
    })
    .catch((e) => {
      throw Error(e);
    });
}
