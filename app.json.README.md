# Про файл app.json

`app.json` — конфигурация **Expo** в формате JSON. В JSON **нельзя** писать комментарии `//`, поэтому пояснения вынесены сюда.

| Поле | Значение | Зачем |
|------|----------|--------|
| `expo.name` | myapp6 | Отображаемое имя (можно сменить на «Распределяющая шляпа»). |
| `expo.slug` | myapp6 | Короткий идентификатор для Expo (URL, публикация). |
| `expo.version` | 1.0.0 | Версия приложения для магазинов. |
| `expo.sdkVersion` | 54.0.0 | Версия SDK Expo — должна совпадать с пакетом `expo` в package.json. |
| `expo.platforms` | ios, android, web | Где можно запустить проект. |
| `expo.assetBundlePatterns` | `**/*` | Какие файлы (картинки и т.д.) упаковывать в сборку. |
| `expo.ios.supportsTablet` | true | Поддержка iPad. |
| `expo.android.adaptiveIcon` | цвет фона | Иконка на Android (позже можно добавить картинку). |

При добавлении иконки или splash-screen Expo подскажет поля в [документации](https://docs.expo.dev/).
