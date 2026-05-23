/**
 * babel.config.js — настройка Babel (транспилятора JavaScript).
 *
 * Телефоны и браузеры не всегда понимают самый новый синтаксис JS/JSX.
 * Babel переписывает наш код в более совместимый вид перед запуском.
 *
 * Expo подключает этот файл автоматически при сборке.
 */

// module.exports — CommonJS-формат (как в Node.js), Expo так и ожидает конфиг.
module.exports = function (api) {
  // api.cache(true) — кэшировать конфиг: быстрее пересборка при `expo start`.
  api.cache(true);

  return {
    // presets — набор правил «по умолчанию».
    // babel-preset-expo — официальный пресет Expo: JSX, современный JS, особенности RN.
    presets: ["babel-preset-expo"],

    // plugins — дополнительные преобразования.
    // react-native-reanimated/plugin — ОБЯЗАТЕЛЕН для reanimated (анимации меню).
    // Важно: этот плагин должен быть ПОСЛЕДНИМ в списке plugins (требование библиотеки).
    plugins: ["react-native-reanimated/plugin"],
  };
};
