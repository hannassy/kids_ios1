/**
 * QuizScreen.js — весь ТЕСТ в одном экране.
 *
 * Подэкраны (screen):
 *   welcome — приветствие
 *   quiz    — вопросы (варианты ответа в случайном порядке)
 *   choice  — если ~60% / ~40% между двумя факультетами — выбор пользователя
 *   result  — финал с фоном-флагом выбранного дома
 */

import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import QUESTIONS from "../questions";
import { HOUSE_THEMES } from "../houseTheme";
import HouseFlagBackground from "../components/HouseFlagBackground";
import { calculateHouseTotals, resolveQuizOutcome } from "../utils/quizScoring";

const QUESTIONS_PER_TEST = 5;

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Вопрос + варианты ответов в случайном порядке (позиция «а» ≠ всегда Гриффиндор). */
function prepareQuestionBatch(questions, count) {
  return shuffle(questions)
    .slice(0, count)
    .map((question) => ({
      ...question,
      options: shuffle(question.options),
    }));
}

export default function QuizScreen() {
  const { width } = useWindowDimensions();

  const [screen, setScreen] = useState("welcome");
  const [questionBatch, setQuestionBatch] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [resultHouse, setResultHouse] = useState(null);
  /** Два факультета на выбор, если шляпа «не решилась». */
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [choicePercents, setChoicePercents] = useState({});

  const buttonWidth = Math.min(360, width - 32);

  const resetQuiz = () => {
    setQuestionBatch([]);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setResultHouse(null);
    setChoiceOptions([]);
    setChoicePercents({});
    setScreen("welcome");
  };

  const startTest = () => {
    setQuestionBatch(prepareQuestionBatch(QUESTIONS, QUESTIONS_PER_TEST));
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setResultHouse(null);
    setChoiceOptions([]);
    setChoicePercents({});
    setScreen("quiz");
  };

  const finishTest = (answers) => {
    const totals = calculateHouseTotals(answers);
    const outcome = resolveQuizOutcome(totals);

    if (outcome.type === "choice") {
      setChoiceOptions(outcome.options);
      setChoicePercents(outcome.percents);
      setScreen("choice");
      return;
    }

    setResultHouse(outcome.winner);
    setScreen("result");
  };

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

  const confirmHouseChoice = (houseKey) => {
    setResultHouse(houseKey);
    setScreen("result");
  };

  const question = questionBatch[currentIndex];
  const theme = resultHouse ? HOUSE_THEMES[resultHouse] : null;

  if (screen === "result" && resultHouse && theme) {
    return (
      <HouseFlagBackground houseKey={resultHouse}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>{theme.title}</Text>
          <Text style={styles.resultDescription}>{theme.description}</Text>
          <Text style={styles.resultHint}>Добро пожаловать в свой факультет!</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonOnFlag, { width: buttonWidth }]}
            onPress={resetQuiz}
          >
            <Text style={styles.buttonText}>Пройти заново</Text>
          </TouchableOpacity>
        </View>
      </HouseFlagBackground>
    );
  }

  return (
    <View style={styles.container}>
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

      {screen === "choice" && choiceOptions.length === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>Шляпа колеблется…</Text>
          <Text style={styles.subtitle}>
            Твои ответы близки к двум факультетам. Куда ты хочешь попасть?
          </Text>
          {choiceOptions.map((houseKey) => (
            <TouchableOpacity
              key={houseKey}
              style={[styles.choiceButton, { width: buttonWidth }]}
              onPress={() => confirmHouseChoice(houseKey)}
            >
              <Text style={styles.choiceTitle}>{HOUSE_THEMES[houseKey].title}</Text>
              <Text style={styles.choicePercent}>
                ~{choicePercents[houseKey]}% по ответам
              </Text>
            </TouchableOpacity>
          ))}
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
  subtitle: { fontSize: 16, color: "#cbd5e1", marginBottom: 24, textAlign: "center", lineHeight: 24 },
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
  choiceButton: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#6366f1",
  },
  choiceTitle: { color: "#f8fafc", fontSize: 18, fontWeight: "700", textAlign: "center" },
  choicePercent: { color: "#94a3b8", fontSize: 14, marginTop: 6, textAlign: "center" },
  resultCard: {
    backgroundColor: "rgba(17, 24, 39, 0.75)",
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  resultDescription: {
    color: "#f1f5f9",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 12,
  },
  resultHint: {
    color: "#e2e8f0",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonOnFlag: { backgroundColor: "rgba(99, 102, 241, 0.95)" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
});
