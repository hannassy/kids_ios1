/**
 * QuestionScreen.js — один ВОПРОС теста (отдельный компонент).
 *
 * Не хранит состояние теста — только показывает данные, которые передал родитель:
 *   question, currentIndex, total, onSelect
 *
 * Урок: сравните с блоком screen === "quiz" в QuizScreen.js — та же логика, но вынесена сюда.
 */

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";

/**
 * @param {object} props
 * @param {object} props.question — текущий вопрос из questions.js
 * @param {number} props.currentIndex — индекс (0, 1, 2…)
 * @param {number} props.total — всего вопросов в тесте (обычно 5)
 * @param {function} props.onSelect — (option) => void, родитель обрабатывает ответ
 */
export default function QuestionScreen({ question, currentIndex, total, onSelect }) {
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(360, width - 32);

  // Защита: если вопроса ещё нет (массив пуст), ничего не рисуем.
  if (!question) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.progress}>
        Вопрос {currentIndex + 1} из {total}
      </Text>
      <Text style={styles.question}>{question.text}</Text>
      <ScrollView style={styles.options}>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, { width: buttonWidth }]}
            onPress={() => onSelect(option)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 24,
    margin: 16,
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
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    alignSelf: "center",
  },
  optionText: {
    color: "#f8fafc",
    fontSize: 16,
  },
});
