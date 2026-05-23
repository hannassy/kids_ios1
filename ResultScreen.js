/**
 * ResultScreen.js — экран РЕЗУЛЬТАТА теста (отдельный компонент).
 *
 * Получает houseKey (например "gryffindor") и подставляет текст из houses.js.
 * onRestart — колбэк «Пройти заново» (родитель сбрасывает state).
 */

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

// Данные факультетов из корневого файла (без emoji — можно добавить в houses.js).
import HOUSES from "./houses";

/**
 * @param {object} props
 * @param {string} props.houseKey — ключ факультета: gryffindor | hufflepuff | ravenclaw | slytherin
 * @param {function} props.onRestart — сброс теста
 */
export default function ResultScreen({ houseKey, onRestart }) {
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(360, width - 32);

  // Если ключ неизвестен — показываем заглушку (на случай ошибки в логике).
  const house = HOUSES[houseKey] || { title: "Неизвестно", description: "" };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{house.title}</Text>
      <Text style={styles.description}>{house.description}</Text>
      <TouchableOpacity
        style={[styles.button, { width: buttonWidth }]}
        onPress={onRestart}
      >
        <Text style={styles.buttonText}>Пройти заново</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    color: "#cbd5e1",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
