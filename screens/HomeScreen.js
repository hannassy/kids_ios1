/**
 * HomeScreen.js — ГЛАВНЫЙ экран («Хогвартс»).
 *
 * Первое, что видит пользователь после открытия приложения (пункт меню Home).
 * Здесь только приветствие и две кнопки — переход к тесту или к справке о факультетах.
 */

// ---------------------------------------------------------------------------
// react-native — базовые «кирпичики» интерфейса на телефоне
// ---------------------------------------------------------------------------
// View      — контейнер, аналог <div> в HTML.
// Text      — любой текст на экране (в RN нельзя писать текст прямо в View).
// TouchableOpacity — кнопка: при нажатии слегка затемняется (opacity).
// StyleSheet — удобный способ описать стили один раз и переиспользовать.
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * HomeScreen — компонент-функция.
 *
 * @param {object} props — свойства, которые React Navigation передаёт автоматически.
 * @param {object} props.navigation — объект для переходов: navigate("Quiz"), goBack() и т.д.
 */
export default function HomeScreen({ navigation }) {
  return (
    // style={styles.container} — класс из объекта StyleSheet внизу файла.
    <View style={styles.container}>
      <Text style={styles.title}>🏰 Хогвартс</Text>
      <Text style={styles.subtitle}>Амиго! Коничуа! Холла! Бонжур!</Text>

      {/* onPress — функция, вызываемая при нажатии (как onClick в HTML). */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>🎩 Распределяющая шляпа</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Houses")}
      >
        <Text style={styles.buttonText}>🏰 Факультеты</Text>
      </TouchableOpacity>
    </View>
  );
}

// StyleSheet.create — стили создаются один раз; RN оптимизирует их лучше, чем inline-объекты.
const styles = StyleSheet.create({
  container: {
    flex: 1, // занять всю высоту экрана
    backgroundColor: "#0f172a",
    alignItems: "center", // по горизонтали — центр
    justifyContent: "center", // по вертикали — центр
    padding: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#cbd5e1",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
