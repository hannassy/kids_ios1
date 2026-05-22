import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import QUESTIONS from "./questions";

const QUESTIONS_PER_TEST = 5;

const HOUSES = {
  gryffindor: {
    title: "Гриффиндор",
    description: "Смелость, благородство и решимость делают тебя идеальным учеником этого факультета.",
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

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function App() {
  const { width } = useWindowDimensions();
  const [screen, setScreen] = useState("welcome");
  const [questionBatch, setQuestionBatch] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [resultHouse, setResultHouse] = useState(null);

  const startTest = () => {
    const selectedQuestions = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_TEST);
    setQuestionBatch(selectedQuestions);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setResultHouse(null);
    setScreen("quiz");
  };

  const finishTest = (answers) => {
    const total = {
      gryffindor: 0,
      hufflepuff: 0,
      ravenclaw: 0,
      slytherin: 0,
    };
    answers.forEach((option) => {
      Object.entries(option.scores).forEach(([house, value]) => {
        total[house] += value;
      });
    });

    const sortedHouses = Object.entries(total).sort((a, b) => b[1] - a[1]);
    setResultHouse(sortedHouses[0][0]);
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

  const restart = () => {
    setScreen("welcome");
    setQuestionBatch([]);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setResultHouse(null);
  };

  const question = questionBatch[currentIndex];
  const buttonWidth = Math.min(360, width - 32);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.root}>
          {screen === "welcome" && (
            <View style={styles.card}>
              <Text style={styles.title}>Распределяющая шляпа</Text>
              <Text style={styles.subtitle}>
                Пройди тест и узнай, к какому факультету Хогвартса ты принадлежишь.
              </Text>
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
              <ScrollView style={styles.options}>
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

          {screen === "result" && resultHouse && (
            <View style={styles.card}>
              <Text style={styles.title}>{HOUSES[resultHouse].title}</Text>
              <Text style={styles.description}>{HOUSES[resultHouse].description}</Text>
              <TouchableOpacity
                style={[styles.button, { width: buttonWidth }]}
                onPress={restart}
              >
                <Text style={styles.buttonText}>Пройти заново</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  root: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    marginBottom: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  progress: {
    color: "#94a3b8",
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center",
  },
  question: {
    color: "#e2e8f0",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 28,
  },
  options: {
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  optionText: {
    color: "#f8fafc",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    color: "#cbd5e1",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
});
