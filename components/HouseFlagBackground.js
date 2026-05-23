/**
 * HouseFlagBackground.js — фон финального экрана: картинка флага факультета.
 *
 * ImageBackground (react-native) — растягивает PNG на весь экран.
 * Поверх — лёгкое затемнение, чтобы белый текст читался на любом флаге.
 */

import { ImageBackground, StyleSheet, View } from "react-native";
import { HOUSE_THEMES } from "../houseTheme";

/**
 * @param {object} props
 * @param {string} props.houseKey — gryffindor | hufflepuff | ravenclaw | slytherin
 * @param {React.ReactNode} props.children — карточка с текстом результата
 */
export default function HouseFlagBackground({ houseKey, children }) {
  const theme = HOUSE_THEMES[houseKey];

  if (!theme?.flagImage) {
    return <View style={styles.fallback}>{children}</View>;
  }

  return (
    <ImageBackground
      source={theme.flagImage}
      style={styles.wrapper}
      resizeMode="cover"
      // accessibilityLabel — для озвучки экрана (VoiceOver на iPhone)
      accessibilityLabel={`Флаг факультета ${theme.title}`}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  fallback: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", padding: 16 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
