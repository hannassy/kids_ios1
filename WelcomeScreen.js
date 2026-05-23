/**
 * WelcomeScreen.js — экран ПРИВЕТСТВИЯ (отдельный компонент).
 *
 * Сейчас QuizScreen рисует приветствие сам. Этот файл — запасной вариант для урока:
 * «разбей большой QuizScreen на три маленьких файла».
 *
 * Родитель передаёт функцию onStart — что делать при нажатии «Пройти тест».
 */

// React здесь импортируем явно (в новых версиях JSX иногда работает и без этого).
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

/**
 * @param {object} props
 * @param {function} props.onStart — вызывается при нажатии кнопки (запуск теста снаружи).
 */
export default function WelcomeScreen({ onStart }) {
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(360, width - 32);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Распределяющая шляпа</Text>
      <Text style={styles.subtitle}>
        Пройди тест и узнай, к какому факультету Хогвартса ты принадлежишь.
      </Text>
      <TouchableOpacity
        style={[styles.button, { width: buttonWidth }]}
        onPress={onStart}
      >
        <Text style={styles.buttonText}>Пройти тест</Text>
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
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    marginBottom: 24,
    lineHeight: 24,
    textAlign: "center",
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
