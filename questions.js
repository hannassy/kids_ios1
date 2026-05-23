/**
 * questions.js — БАНК ВОПРОСОВ для сортировочной шляпы.
 *
 * Это «база данных» в виде обычного JavaScript-массива (без сервера).
 * QuizScreen импортирует QUESTIONS, перемешивает и берёт 5 штук за тест.
 *
 * ─── Как устроен один вопрос ───
 * {
 *   id: число — уникальный номер (для себя, в логике почти не используется),
 *   text: строка — текст вопроса на экране,
 *   options: массив из 4 вариантов ответа.
 * }
 *
 * ─── Как устроен один вариант ответа ───
 * {
 *   id: "a" | "b" | "c" | "d" — буква (нужна для key в React при отрисовке списка),
 *   text: что видит пользователь на кнопке,
 *   scores: объект — сколько БАЛЛОВ даёт каждому факультету за этот ответ.
 * }
 *
 * Ключи факультетов в scores (всегда на английском):
 *   gryffindor — Гриффиндор
 *   hufflepuff — Пуффендуй
 *   ravenclaw  — Когтевран
 *   slytherin  — Слизерин
 *
 * Пример: scores: { gryffindor: 2, hufflepuff: 0, ravenclaw: 0, slytherin: 0 }
 * значит «этот ответ сильно тянет в Гриффиндор».
 *
 * ─── Задание для дочери ───
 * Скопируйте блок одного вопроса (от { id: ... } до },), вставьте в конец массива,
 * поменяйте id, text и тексты вариантов. Сумма баллов в scores — на ваш вкус (0–2).
 *
 * Ниже — 12 готовых вопросов. Каждый повторяет одну и ту же структуру.
 */

const QUESTIONS = [
  {
    id: 1,
    text: "Что ты сделаешь, если увидишь, что друг оказался в беде?",
    options: [
      {
        id: "a",
        text: "Поспешу помочь, даже если это опасно",
        scores: { gryffindor: 2, hufflepuff: 1, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "b",
        text: "Сначала оценю ситуацию и спланирую",
        scores: { ravenclaw: 2, slytherin: 1, hufflepuff: 0, gryffindor: 0 },
      },
      {
        id: "c",
        text: "Помогу тихо и верно, без лишнего шума",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Подумаю, как это может помочь мне самому",
        scores: { slytherin: 2, ravenclaw: 0, gryffindor: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 2,
    text: "Какой предмет в школе тебе нравится больше всего?",
    options: [
      {
        id: "a",
        text: "Трансфигурация — сила и смелость",
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 0, hufflepuff: 0 },
      },
      {
        id: "b",
        text: "Зельеварение — хитрость и терпение",
        scores: { slytherin: 2, hufflepuff: 1, ravenclaw: 0, gryffindor: 0 },
      },
      {
        id: "c",
        text: "Истории магии — знания и любознательность",
        scores: { ravenclaw: 2, hufflepuff: 1, gryffindor: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Уход за магическими существами — забота и терпение",
        scores: { hufflepuff: 2, ravenclaw: 0, gryffindor: 0, slytherin: 0 },
      },
    ],
  },
  {
    id: 3,
    text: "Какое качество ты ценишь в себе больше всего?",
    options: [
      {
        id: "a",
        text: "Смелость и решительность",
        scores: { gryffindor: 2, ravenclaw: 0, hufflepuff: 0, slytherin: 1 },
      },
      {
        id: "b",
        text: "Ум и логика",
        scores: { ravenclaw: 2, slytherin: 1, gryffindor: 0, hufflepuff: 0 },
      },
      {
        id: "c",
        text: "Верность и доброта",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Амбиции и расчетливость",
        scores: { slytherin: 2, ravenclaw: 0, gryffindor: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 4,
    text: "Какой стиль отдыха тебе ближе всего?",
    options: [
      {
        id: "a",
        text: "Экстремальные приключения",
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 0, hufflepuff: 0 },
      },
      {
        id: "b",
        text: "Тихое чтение и изучение нового",
        scores: { ravenclaw: 2, hufflepuff: 1, gryffindor: 0, slytherin: 0 },
      },
      {
        id: "c",
        text: "Совместные посиделки с друзьями",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Планирование и подготовка к успеху",
        scores: { slytherin: 2, ravenclaw: 0, gryffindor: 0, hufflepuff: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "Что для тебя важнее в команде?",
    options: [
      {
        id: "a",
        text: "Смелость и подкрепление",
        scores: { gryffindor: 2, hufflepuff: 1, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "b",
        text: "Интеллект и оригинальные идеи",
        scores: { ravenclaw: 2, slytherin: 1, gryffindor: 0, hufflepuff: 0 },
      },
      {
        id: "c",
        text: "Честность и преданность",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Амбиции и лидерство",
        scores: { slytherin: 2, gryffindor: 1, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 6,
    text: "Как ты выбираешь новый путь?",
    options: [
      {
        id: "a",
        text: "Иду туда, где могу проявить себя",
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 0, hufflepuff: 0 },
      },
      {
        id: "b",
        text: "Сначала изучу все возможности",
        scores: { ravenclaw: 2, hufflepuff: 0, slytherin: 1, gryffindor: 0 },
      },
      {
        id: "c",
        text: "Смотрю, что будет полезно другим",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Выберу путь, который приведет к успеху",
        scores: { slytherin: 2, ravenclaw: 0, gryffindor: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 7,
    text: "Что вызывает в тебе наибольший интерес?",
    options: [
      {
        id: "a",
        text: "Защищать и помогать другим",
        scores: { gryffindor: 2, hufflepuff: 1, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "b",
        text: "Разгадывать сложные задачи",
        scores: { ravenclaw: 2, slytherin: 1, gryffindor: 0, hufflepuff: 0 },
      },
      {
        id: "c",
        text: "Создавать мир и гармонию",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Достигать целей любой ценой",
        scores: { slytherin: 2, gryffindor: 0, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 8,
    text: "Какой девиз кажется тебе ближе всего?",
    options: [
      {
        id: "a",
        text: "Смелость важнее всего",
        scores: { gryffindor: 2, hufflepuff: 0, ravenclaw: 0, slytherin: 1 },
      },
      {
        id: "b",
        text: "Учение — свет",
        scores: { ravenclaw: 2, hufflepuff: 1, gryffindor: 0, slytherin: 0 },
      },
      {
        id: "c",
        text: "Труд и честность ведут к успеху",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Сила через амбиции",
        scores: { slytherin: 2, gryffindor: 0, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 9,
    text: "Что ты выберешь в споре?",
    options: [
      {
        id: "a",
        text: "Действовать смело и уверенно",
        scores: { gryffindor: 2, slytherin: 1, ravenclaw: 0, hufflepuff: 0 },
      },
      {
        id: "b",
        text: "Показать, что я прав логикой",
        scores: { ravenclaw: 2, slytherin: 1, gryffindor: 0, hufflepuff: 0 },
      },
      {
        id: "c",
        text: "Сохранить добрые отношения",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Выиграть любой ценой",
        scores: { slytherin: 2, gryffindor: 0, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 10,
    text: "Какой подарок ты бы подарил другу?",
    options: [
      {
        id: "a",
        text: "Символ смелости и поддержки",
        scores: { gryffindor: 2, hufflepuff: 1, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "b",
        text: "Книгу на интересную тему",
        scores: { ravenclaw: 2, hufflepuff: 0, gryffindor: 0, slytherin: 1 },
      },
      {
        id: "c",
        text: "Теплый и полезный подарок",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Что-то статусное и впечатляющее",
        scores: { slytherin: 2, gryffindor: 1, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
  {
    id: 11,
    text: "Как ты предпочитаешь проводить вечер?",
    options: [
      {
        id: "a",
        text: "В компании друзей и приключений",
        scores: { gryffindor: 2, hufflepuff: 1, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "b",
        text: "За интересным чтением или обучением",
        scores: { ravenclaw: 2, slytherin: 1, gryffindor: 0, hufflepuff: 0 },
      },
      {
        id: "c",
        text: "В спокойной уютной атмосфере",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Работу над планами и целями",
        scores: { slytherin: 2, ravenclaw: 0, gryffindor: 0, hufflepuff: 1 },
      },
    ],
  },
  {
    id: 12,
    text: "Что тебя мотивирует идти вперед?",
    options: [
      {
        id: "a",
        text: "Храбрость и честь",
        scores: { gryffindor: 2, hufflepuff: 0, ravenclaw: 0, slytherin: 1 },
      },
      {
        id: "b",
        text: "Желание узнать больше",
        scores: { ravenclaw: 2, hufflepuff: 0, gryffindor: 0, slytherin: 1 },
      },
      {
        id: "c",
        text: "Помогать другим и быть нужным",
        scores: { hufflepuff: 2, gryffindor: 0, ravenclaw: 0, slytherin: 0 },
      },
      {
        id: "d",
        text: "Достичь своей цели любой ценой",
        scores: { slytherin: 2, gryffindor: 1, ravenclaw: 0, hufflepuff: 0 },
      },
    ],
  },
];

// Экспорт по умолчанию: в QuizScreen пишут import QUESTIONS from "../questions".
export default QUESTIONS;
