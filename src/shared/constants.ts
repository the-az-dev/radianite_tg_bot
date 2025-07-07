// Chat constants for roles and chat types
const adminTypes = ["administrator", "creator"];
const chatTypes = ["group", "supergroup"];
const personalChatType = ["private"];
const channeltype = ["channel"];

// IDs for chats
const chatFindId = 15;

// Basic constant duration for deleting welcome message and re-freshing reputation for each user.
const deletingTime = 5 * 60 * 1000;
const reputationUpdatingTime = 1000 * 60 * 60 * 24;
const reputationCooldown = 14;
const mmrUpdatingTime = 1 * 60 * 1000 * 24;

// Basic number data for some elements
const maximumMMRPoints = 30;
const minimumMMRPoints = -29;
const mmrProbability = 0.355;
const zeroMMRProbality = 0.05;
const yes_noMatchProbability = 0.5;
const yesMatchNightMin = 0.1;
const yesMatchNightMax = 0.45;
const yesMatchDefaultMin = 0.55;
const yesMatchDefaultMax = 0.95;
const mmrCountingCoef = 10;
const randomBonus = Math.floor(Math.random() * 5);

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
const usersInfoMessageGroup =
  `Інформація про Валорантера:
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
const noDataAboutUserMessage = "Або я в очі довбусь, або про нього 0 інфи 🤔\nСпробуйте іншим разом!";
const noStatsMessageGroup = "Поки що все голо... Дивно якось насправді...";
const mmrUpMessageGroup = "ОГО! Апнув ММР-чик сьогодні заїбенно 😏 Підняв на +{mmr_number}. Тепер у тебе - {total_points} поінтів.\nІ памятай! Ми не Ріоти - ми рахуємо з урахуванням репутації і твоєї везучості 😉\nНаступне оновлення через - {refresh_time}";
const mmrDownMessageGroup = "ХА-ХА! Схавав? Просрав аж -{mmr_number}. А скільки в тебе зараз? Аж, {total_points} поінтів 🙃\nGG EZ BOTZ 😈\nПриходь через {refresh_time}, якщо не слабак 🤓";
const noMMRMessageGroup = "ОГО... Нічия... Поінтів не дало, тому у тебе стабільно - {total_points}\nСпробуй ще раз через {refresh_time}!";
const mmrZeroMessageGroup = "Ти не маєш MMR-у! Іди калібруся 🤓\nНаступне оновлення через - {refresh_time}";
const usersMMRMessageGroup = "Твій MMR наразі - {total_points}";
const timeForMMRNotRefreshed = "Ти вже отримав свої ММР! Потерпи ще {refresh_time}";
const startMatchYes = "Раджу зарегати катку! 100% виграєте 🫶";
const startMatchNo = "Ви шо хворі? Не регайте катку! А хотя.. Регайте, якщо садомазахісти 🤓";
const notForFindThread = "Не та гілка для пошуку! Хоча я не здивуюсь що ти так само мажеш і в ранкеді 🙃"

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
  reputationCooldown
};
