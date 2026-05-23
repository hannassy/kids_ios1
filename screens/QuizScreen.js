/**
 * QuizScreen.js — весь ТЕСТ в одном экране.
 *
 * Три «подэкрана» переключаются через state screen:
 *   welcome — приветствие и кнопка «Пройти тест»
 *   quiz    — вопросы по очереди
 *   result  — итоговый факультет
 *
 * Так проще для начала обучения; позже можно разнести на WelcomeScreen / QuestionScreen / ResultScreen.
 */

// useState — хук React: переменная, при изменении которой экран перерисовывается.
import { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions, // ширина/высота окна — чтобы кнопки не были шире экрана
} from "react-native";

// Вопросы из отдельного файла (банк из 12 штук).
import QUESTIONS from "../questions";

// Сколько вопросов за один прохождение теста (легко поменять на 3 или 7).
const QUESTIONS_PER_TEST = 5;

// Тексты результата с emoji (в QuizScreen свой объект; в houses.js — без emoji для ResultScreen).
const HOUSES = {
  gryffindor: {
    title: "🦁 Гриффиндор",
    description:
      "Смелость, благородство и решимость делают тебя идеальным учеником этого факультета.",
  },
  hufflepuff: {
    title: "🦡 Пуффендуй",
    description: "Верность, доброта и трудолюбие — твои главные качества.",
  },
  ravenclaw: {
    title: "🦅 Когтевран",
    description: "Интеллект, любознательность и оригинальность ведут тебя вперед.",
  },
  slytherin: {
    title: "🐍 Слизерин",
    description: "Амбиции, хитрость и воля к победе — твои сильные стороны.",
  },
};

/**
 * shuffle — перемешивает массив (алгоритм Фишера–Йетса).
 * Копируем массив [...array], чтобы не испортить оригинал QUESTIONS.
 */
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function QuizScreen() {
  const { width } = useWindowDimensions();

  // --- Состояние теста (state) ---
  const [screen, setScreen] = useState("welcome");
  const [questionBatch, setQuestionBatch] = useState([]); // 5 выбранных вопросов
  const [currentIndex, setCurrentIndex] = useState(0); // номер текущего (0..4)
  const [selectedAnswers, setSelectedAnswers] = useState([]); // выбранные варианты ответов
  const [resultHouse, setResultHouse] = useState(null); // ключ победившего факультета

  // Ширина кнопок: не больше 360px и с отступами от краёв экрана.
  const buttonWidth = Math.min(360, width - 32);

  /** Сброс и старт: случайные 5 вопросов, обнуляем ответы. */
  const startTest = () => {
    setQuestionBatch(shuffle(QUESTIONS).slice(0, QUESTIONS_PER_TEST));
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setResultHouse(null);
    setScreen("quiz");
  };

  /**
   * finishTest — подсчёт баллов по всем ответам.
   * У каждого option есть scores: { gryffindor: 2, ... } — складываем.
   */
  const finishTest = (answers) => {
    const total = { gryffindor: 0, hufflepuff: 0, ravenclaw: 0, slytherin: 0 };
    answers.forEach((option) => {
      Object.entries(option.scores).forEach(([house, value]) => {
        total[house] += value;
      });
    });
    // Сортируем факультеты по убыванию баллов; первый — победитель.
    const sorted = Object.entries(total).sort((a, b) => b[1] - a[1]);
    setResultHouse(sorted[0][0]);
    setScreen("result");
  };

  /** Пользователь нажал вариант ответа. */
  const selectAnswer = (option) => {
    const nextAnswers = [...selectedAnswers, option];
    setSelectedAnswers(nextAnswers);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questionBatch.length) {
      finishTest(nextAnswers);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const question = questionBatch[currentIndex];

  return (
    <View style={styles.container}>
      {/* --- Экран приветствия --- */}
      {screen === "welcome" && (
        <View style={styles.card}>
          <Text style={styles.title}>Распределяющая шляпа</Text>
          <Text style={styles.subtitle}>Пройди тест и узнай свой факультет!</Text>
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }]}
            onPress={startTest}
          >
            <Text style={styles.buttonText}>Пройти тест</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- Экран вопроса --- */}
      {screen === "quiz" && question && (
        <View style={styles.card}>
          <Text style={styles.progress}>
            Вопрос {currentIndex + 1} из {QUESTIONS_PER_TEST}
          </Text>
          <Text style={styles.question}>{question.text}</Text>
          <ScrollView>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionButton, { width: buttonWidth }]}
                onPress={() => selectAnswer(option)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* --- Экран результата --- */}
      {screen === "result" && resultHouse && (
        <View style={styles.card}>
          <Text style={styles.title}>{HOUSES[resultHouse].title}</Text>
          <Text style={styles.description}>{HOUSES[resultHouse].description}</Text>
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }]}
            onPress={() => setScreen("welcome")}
          >
            <Text style={styles.buttonText}>Пройти заново</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", padding: 16 },
  card: { backgroundColor: "#111827", borderRadius: 20, padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, color: "#cbd5e1", marginBottom: 24, textAlign: "center" },
  progress: { color: "#94a3b8", marginBottom: 12, fontSize: 14, textAlign: "center" },
  question: {
    color: "#e2e8f0",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  optionText: { color: "#f8fafc", fontSize: 16 },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  description: { color: "#cbd5e1", fontSize: 18, lineHeight: 26, textAlign: "center" },
});
