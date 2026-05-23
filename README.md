# Распределяющая шляпа (MyApp6)

Семейный учебный проект: мобильное приложение «сортировка по факультетам Хогвартса» на **React Native** и **Expo**.

- Идея, сценарии, план обучения — [APP_DESCRIPTION.md](./APP_DESCRIPTION.md)
- **Windows + iPhone (Expo Go): установка и запуск** — [SETUP_WINDOWS.md](./SETUP_WINDOWS.md) ← начать отсюда на новом ПК

## Быстрый старт

```powershell
cd "C:\Users\Hanna\OneDrive\Документы\Project\MyApp6"
npm install
npx expo start
```

| Куда запускать | Как |
|----------------|-----|
| **iPhone** | Установить **Expo Go** (App Store) → тот же Wi‑Fi, что и ПК → Scan QR в терминале |
| **Браузер на Windows** | В терминале нажать `w` |
| **Android-телефон** | Expo Go из Play Market → QR, как на iPhone |

На Windows **нет** iOS-симулятора (клавиша `i` только на Mac). Для iOS используем реальный iPhone и Expo Go — подробно в [SETUP_WINDOWS.md](./SETUP_WINDOWS.md).

Если телефон не видит ПК по Wi‑Fi:

```powershell
npx expo start --tunnel
```

## Для дочери: с чего начать правки

1. Открыть `screens/HomeScreen.js` — поменять текст в `<Text>`.
2. Сохранить файл — приложение на телефоне обновится само (hot reload).
3. Открыть `questions.js` — добавить один новый вопрос по образцу в комментариях в начале файла.

В каждом `.js` много комментариев: что импортируется и зачем.

## Авторы

Совместная разработка: папа (веб/Magento) + дочери; мобильная разработка — новый навык для всей семьи, идём поэтапно.
