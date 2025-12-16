const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8579677026:AAFDVHBFRpHWifc7hsAq6C_pRUwkOsITe-Y";

const bot = new TelegramBot(TOKEN, {
  polling: {
    autoStart: true,
    interval: 300,
    params: { timeout: 10 }
  }
});

// ===== /start =====
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    "🐾 Добро пожаловать в питомник!\n\nНажми кнопку, чтобы начать играть.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🐶 Открыть питомник",
              web_app: {
                url: "https://walkeruij-source.github.io/pet-app/"
              }
            }
          ]
        ]
      }
    }
  );
});
