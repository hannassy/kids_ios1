/**
 * houses.js — тексты факультетов для экрана РЕЗУЛЬТАТА.
 *
 * Отдельный файл, чтобы не смешивать «данные» и «внешний вид».
 * ResultScreen.js импортирует этот объект и показывает title + description.
 *
 * Ключи (gryffindor, hufflepuff, …) должны совпадать с ключами в scores в questions.js.
 */

const HOUSES = {
  gryffindor: {
    title: "Гриффиндор",
    description:
      "Смелость, благородство и решимость делают тебя идеальным учеником этого факультета.",
  },
  hufflepuff: {
    title: "Пуффендуй",
    description: "Верность, доброта и трудолюбие — твои главные качества.",
  },
  ravenclaw: {
    title: "Когтевран",
    description: "Интеллект, любознательность и оригинальность ведут тебя вперед.",
  },
  slytherin: {
    title: "Слизерин",
    description: "Амбиции, хитрость и воля к победе — твои сильные стороны.",
  },
};

// export default — при import HOUSES from "./houses" получим этот объект.
export default HOUSES;
