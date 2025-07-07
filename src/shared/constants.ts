// Chat constants for roles and chat types
const adminTypes = ["administrator", "creator"];
const chatTypes = ["group", "supergroup"];
const personalChatType = ["private"];
const channeltype = ["channel"];

// IDs for chats
const chatFindId = 15;
const playMatchChatId = 1587;

// Basic constant duration for deleting welcome message and re-freshing reputation for each user.
const deletingTime = 5 * 60 * 1000;
const reputationUpdatingTime = 1000 * 60 * 60 * 24;
const reputationCooldown = 14;
const mmrUpdatingTime = 1 * 60 * 1000 * 24;

// Basic number data for some elements
const maximumMMRPoints = 30;
const minimumMMRPoints = -29;
const mmrProbability = 0.428;
const zeroMMRProbality = 0.005;
const yes_noMatchProbability = 0.5;
const yesMatchNightMin = 0.1;
const yesMatchNightMax = 0.45;
const yesMatchDefaultMin = 0.55;
const yesMatchDefaultMax = 0.95;
const mmrCountingCoef = 10;
const randomBonus = Math.floor(Math.random() * 5);

const mapsList = [
  "Ascent",
  "Abbyss",
  "Bind",
  "Breezze",
  "Corrode",
  "Haven",
  "Icebox",
  "Split",
  "Sunset",
  "Fracture",
  "Lotus",
];
const rankList = [
  "Iron 1",
  "Iron 2",
  "Iron 3",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
  "Gold 1",
  "Gold 2",
  "Gold 3",
  "Platinum 1",
  "Platinum 2",
  "Platinum 3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Ascendant 1",
  "Ascendant 2",
  "Ascendant 3",
  "Immortal 1",
  "Immoratal 2",
  "Immoratal 3",
  "Radiant",
];

const rankMMRList = [
  100, 500, 1001, 1502, 2003, 2654, 3105, 3706, 4208, 4809, 5310, 5911, 6412,
  7113, 7614, 8215, 8816, 9417, 10118, 10619, 11220, 11921, 12422, 12923, 15000,
];

// All messages can be updated or using more that 1 time for each rumble in the chat.
// Note - if u wanna update it beyond all app - use config or env files
const banMessageGrop = `🔇 <a href="tg://user?id={message_link}">Забанений</a>\nПричина: {reason}`;
const muteMessageGroup = `🔇 <a href="tg://user?id={message_link}">Замучений</a> на {duration}
Причина: {reason}`;
const kickMessageGroup = `👢 <a href="tg://user?id={message_link}">Кікнутий</a>
Причина: {reason}`;
const warnMessageGroup =
  '⚠️ <a href="tg://user?id={message_link}">Отримав попередження</a>\nПричина: {reason}`';
const warnMessageUser = `⚠️ Ви отримали попередження!
Причина: {reason}
ℹ️ Лінк на порушення: https://t.me/c/{message_link}
Подібні порушення можуть привести до муту \\ бану. Будьте обережні!
`;
const muteMessageUser = `🔇 Ви замучений на {duration}
Причина: {reason}
ℹ️ Лінк на повідомлення з порушенням: https://t.me/c/{message_link}`;
const banMessageUser = "🔇 Вас забанено на {duration}\nПричина: {reason}";
const kickMessageUser = "👢 Ви кікнутий з чату!\nПричина: {reason}";
const needReplyMessage = "🔄 Використай команду у відповіді на повідомлення!";
const adminOnlyMessage = "🚫 Лише адмін може це робити!";
const needFormatDateMessage =
  "❗ Вкажіть правильний формат часу. Допустимий формат (приклад): 10m, 1h, 2d";
const forrbidenToBotMessage = "🤫 Бот під дісмісем! Інсталок завжди все рішає!";
const reputationUpMessageGroup =
  '📈 <a href="tg://user?id={message_link}">Репутація піднята</a> на 5 балів! GGWP';
const reputationDownMessageGroup =
  '📉 <a href="tg://user?id={message_link}">Репутацію опущено</a> на 5 балів! NT GG';
const welcomeMessageGroup = `
🎉 Привіт, Валорантер! Ця група створена з ціллю пошуку тімейтів та живого спілкування для українського Valorant комʼюніті.

➡️ <a href="https://t.me/Radianite_ua/5">Новини</a> — останні новини по грі, промокоди.
➡️ <a href="https://t.me/Radianite_ua/47">Загальний чат</a> — говори про все, що забажаєш.
➡️ <a href="https://t.me/Radianite_ua/15">Пошук тіммейтів</a> — знайдеш напарників.

Щоб додати інформацію про себе — напиши мені в <a href="https://t.me/Radianite_bot">особисті</a>.
`;
const usersInfoMessageGroup = `Інформація про Валорантера:
Вік: {age};
Годин в грі: {game_hours}
Lvl гравця: {game_lvl};
Ранг: {rank};
Агенти: {agents};
Улюблені мапи: {favorite_maps};
Має мікро: {micro};
Його трекер: {val_tracker};
Додаткова інформація: {notes}
`;
const playersFoundedMessageUser = "";
const statsMessageGroup = "";
const rulesMessageGroup = `
📜Правила Valorant UA

1. Без токсичності.
Флейм, образи, провокації — одразу попередження або бан.

2. Ніяких спойлерів, читів і реклами.
Заборонено обговорення сторонніх програм, накруток, зливів і сторонньої реклами.
/report — якщо щось не так.
Помітив порушника — не сій срач, просто пінгани бота.

3. Поважай інших.
Комусь Jett, комусь Omen. Усі ми тут грати, а не випендрюватись.

4. Меми — в меми. Хайлайти — у хайлайти.
Для всього є свої гілки. Використовуй їх.

🧠 P.S. Адміни слідкують, бот пам'ятає.
💀 Повторні порушення — бан/мут без попередження.
`;
const reportMessageUser = "⚠️ Скарга відправлена! Очікуйте відповіді адмінів!";
const reportMessageAdmin =
  '⚠️ Отримано скаргу на користувача.\n📋 Повідомлення на яке поскаржились можете глянути <a href=https://t.me/c/{message_link}"">тут</a>.\nПерегляньте ситуацію і зробіть виважені дії!';
const noDataContained = "📋 Відсутня інформація";
const noDataAboutUserMessage =
  "Або я в очі довбусь, або про нього 0 інфи 🤔\nСпробуйте іншим разом!";
const noStatsMessageGroup = "Поки що все голо... Дивно якось насправді...";
const mmrUpMessageGroup =
  "ОГО! Апнув ММР-чик сьогодні заїбенно на {map} 😏 Підняв на +{mmr_number}. Тепер у тебе - {total_points} поінтів.\nІ памятай! Ми не Ріоти - ми рахуємо з урахуванням репутації і твоєї везучості 😉";
const mmrDownMessageGroup =
  "ХА-ХА! Схавав на {map}? Просрав аж -{mmr_number}. А скільки в тебе зараз? Аж, {total_points} поінтів 🙃\nGG EZ BOTZ 😈\nПриходь ще, якщо не слабак 🤓";
const noMMRMessageGroup =
  "ОГО... Нічия... Поінтів не дало, тому у тебе стабільно - {total_points}";
const mmrZeroMessageGroup = "Ти не маєш MMR-у! Іди калібруся 🤓";
const usersMMRMessageGroup = "Твій MMR наразі - {total_points}\nРанг на базі ММР у тебе - {rank}";
const usersMMRMessageGroupResponse = "MMR гравця @{user} наразі - {total_points}\nРанг на базі ММР у нього/неї - {rank}";
const timeForMMRNotRefreshed =
  "Ти вже отримав свої ММР! Потерпи ще {refresh_time}";
const startMatchYes = "Раджу зарегати катку! 100% виграєте 🫶";
const startMatchNo =
  "Ви шо хворі? Не регайте катку! А хотя.. Регайте, якщо садомазахісти 🤓";
const notForFindThread =
  "Не та гілка для пошуку! Хоча я не здивуюсь що ти так само мажеш і в ранкеді 🙃";

const howToPlayMatchMessage = `Для того щоби ви могли грати в Competetive по телеграмівськи ви повинні виконати команду /reg, якщо ви ще не реєструвались в системі🙃!

Наступним кроком буде перевірка вашого ММР-у та рангу за командою -
/my_rank.

Ну й тепер переходимо у гілку Зарегати катку.
Щоб почати гру пишете -
/play_match

Як саме працює система🔽
- Ви запускаєте матч 👇;
- Система шукає вам суперників і звіряє ваші ММР📋;
- У кого більше, той і переміг😇;
- Переможець отримує до +30 до свого ММР рахунку і за такої нагоди, йому апається ранг😎;
- Той хто програв втрачає теж не мало ММР, інколи навіть як в Валіку🤓;
- Репутація теж впливає на ваш загальний ММР і ранг, тому будьте уважні🤫;

Щасти і нехай не буде поломаної клавіатури чи згорілого пукана від інсталокера / смурфа / руїнера 😉
`;

export {
  adminTypes,
  channeltype,
  personalChatType,
  chatTypes,
  deletingTime,
  chatFindId,
  reputationUpdatingTime,
  banMessageGrop,
  banMessageUser,
  muteMessageGroup,
  muteMessageUser,
  warnMessageGroup,
  warnMessageUser,
  kickMessageGroup,
  kickMessageUser,
  welcomeMessageGroup,
  reputationUpMessageGroup,
  reputationDownMessageGroup,
  reportMessageUser,
  reportMessageAdmin,
  needReplyMessage,
  adminOnlyMessage,
  forrbidenToBotMessage,
  usersInfoMessageGroup,
  playersFoundedMessageUser,
  statsMessageGroup,
  rulesMessageGroup,
  needFormatDateMessage,
  noDataContained,
  noDataAboutUserMessage,
  noStatsMessageGroup,
  mmrUpMessageGroup,
  mmrDownMessageGroup,
  noMMRMessageGroup,
  mmrZeroMessageGroup,
  usersMMRMessageGroup,
  usersMMRMessageGroupResponse,
  timeForMMRNotRefreshed,
  startMatchYes,
  startMatchNo,
  maximumMMRPoints,
  minimumMMRPoints,
  mmrProbability,
  zeroMMRProbality,
  yes_noMatchProbability,
  yesMatchDefaultMin,
  yesMatchDefaultMax,
  yesMatchNightMax,
  yesMatchNightMin,
  notForFindThread,
  mmrUpdatingTime,
  mmrCountingCoef,
  randomBonus,
  reputationCooldown,
  playMatchChatId,
  rankList,
  rankMMRList,
  mapsList,
  howToPlayMatchMessage,
};
