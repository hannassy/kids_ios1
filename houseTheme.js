/**
 * houseTheme.js — тексты и картинки флагов факультетов.
 *
 * flagImage — PNG в assets/houses/ (баннеры как в зале Хогвартса).
 * require() — так React Native подключает локальные картинки при сборке.
 */

export const HOUSE_THEMES = {
  gryffindor: {
    title: "🦁 Гриффиндор",
    description:
      "Смелость, благородство и решимость делают тебя идеальным учеником этого факультета.",
    flagImage: require("./assets/houses/flag-gryffindor.png"),
  },
  hufflepuff: {
    title: "🦡 Пуффендуй",
    description: "Верность, доброта и трудолюбие — твои главные качества.",
    flagImage: require("./assets/houses/flag-hufflepuff.png"),
  },
  ravenclaw: {
    title: "🦅 Когтевран",
    description: "Интеллект, любознательность и оригинальность ведут тебя вперед.",
    flagImage: require("./assets/houses/flag-ravenclaw.png"),
  },
  slytherin: {
    title: "🐍 Слизерин",
    description: "Амбиции, хитрость и воля к победе — твои сильные стороны.",
    flagImage: require("./assets/houses/flag-slytherin.png"),
  },
};
