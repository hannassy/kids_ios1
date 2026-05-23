/**
 * babel.config.js — настройка Babel (транспилятора JavaScript).
 *
 * Телефоны и браузеры не всегда понимают самый новый синтаксис JS/JSX.
 * Babel переписывает наш код в более совместимый вид перед запуском.
 *
 * Expo подключает этот файл автоматически при сборке.
 *
 * ВАЖНО (Expo SDK 54 + Reanimated 4):
 * Плагин для анимаций НЕ прописываем вручную — babel-preset-expo сам добавит
 * react-native-worklets/plugin, если установлены react-native-reanimated и react-native-worklets.
 * Дублирование плагина ломает запуск: «Exception in HostFunction».
 */

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    // plugins: [] — намеренно пусто; worklets/reanimated подставит preset-expo.
  };
};
