/**
 * HousesScreen.js — справочный экран «Факультеты».
 *
 * Не участвует в тесте: просто показывает карточки четырёх домов Хогвартса.
 * Удобно для обучения: можно попросить дочь добавить пятую карточку или emoji.
 */

import { ScrollView, View, Text, StyleSheet } from "react-native";

// Данные лежат прямо в файле (массив объектов). Позже можно вынести в houses.js.
const HOUSES = [
  {
    key: "gryffindor",
    title: "🦁 Гриффиндор",
    color: "#991b1b",
    description: "Смелость, благородство и решимость. На этом факультете вам точно не будет скучно. Цвета: красный и золотой.",
  },
  {
    key: "hufflepuff",
    title: "🦡 Пуффендуй",
    color: "#92400e",
    description: "Верность, доброта и трудолюбие. На этом факультете вы будете жить в дружбе. Цвета: жёлтый и чёрный.",
  },
  {
    key: "ravenclaw",
    title: "🦅 Когтевран",
    color: "#1e3a8a",
    description: "Интеллект, любознательность и оригинальность. На этом факультете вы будете учиться и станете отличниками. Цвета: синий и серебряный.",
  },
  {
    key: "slytherin",
    title: "🐍 Слизерин",
    color: "#14532d",
    description: "Амбиции, хитрость и воля к победе. На этом факультете вы достигнете величия Цвет: зеленый и серебрянный" 
  },
];

export default function HousesScreen() {
  return (
    // ScrollView — если контент не помещается на экран, можно прокрутить вниз.
    <ScrollView style={styles.container}>
      {/* map — для каждого элемента массива рисуем одну карточку View */}
      {HOUSES.map((house) => (
        <View
          key={house.key}
          // Динамический стиль: цвет фона берём из объекта house.color
          style={[styles.card, { backgroundColor: house.color }]}
        >
          <Text style={styles.title}>{house.title}</Text>
          <Text style={styles.description}>{house.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#f1f5f9",
    lineHeight: 24,
  },
});
