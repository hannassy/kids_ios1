/**
 * App.js — КОРНЕВОЙ компонент приложения.
 *
 * Здесь не рисуют кнопки теста, а настраивают НАВИГАЦИЮ:
 * какие экраны есть и как между ними переключаться (в т.ч. боковое меню).
 *
 * Аналогия с вебом (Magento/PHP): это как layout с меню,
 * а отдельные screens/ — как отдельные страницы контента.
 */

// ---------------------------------------------------------------------------
// @react-navigation/native — ядро навигации
// ---------------------------------------------------------------------------
// NavigationContainer — обязательная «обёртка» вокруг всех экранов.
// Хранит текущий маршрут, историю переходов, передаёт navigation в дочерние экраны.
import { NavigationContainer } from "@react-navigation/native";

// ---------------------------------------------------------------------------
// @react-navigation/drawer — выдвижное боковое меню
// ---------------------------------------------------------------------------
// createDrawerNavigator — фабрика: создаёт навигатор с «шторкой» слева (иконка ☰).
// Пользователь свайпает или жмёт меню — видит список разделов.
import { createDrawerNavigator } from "@react-navigation/drawer";

// ---------------------------------------------------------------------------
// Наши экраны (каждый — отдельный файл в папке screens/)
// ---------------------------------------------------------------------------
// default export из файла = один главный компонент экрана.
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import HousesScreen from "./screens/HousesScreen";

// Создаём объект-навигатор. Drawer — тип меню; дальше в JSX пишем Drawer.Screen.
const Drawer = createDrawerNavigator();

/**
 * App — функция-компонент (в React так принято называть «кусок интерфейса»).
 * export default — этот компонент импортируется в index.js как главный.
 */
export default function App() {
  return (
    // Всё приложение с навигацией должно быть внутри NavigationContainer.
    <NavigationContainer>
      {/* Drawer.Navigator — контейнер экранов с боковым меню */}
      <Drawer.Navigator
        // screenOptions — общие стили для шапки и пунктов меню (применяются ко всем экранам).
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" }, // фон верхней полоски
          headerTintColor: "#f8fafc", // цвет стрелки «назад» и иконки меню
          headerTitleStyle: { fontWeight: "700" }, // жирный заголовок в шапке
          drawerStyle: { backgroundColor: "#111827" }, // фон выдвижной панели
          drawerLabelStyle: { color: "#f8fafc", fontSize: 16 }, // текст пунктов меню
          drawerActiveTintColor: "#6366f1", // цвет активного пункта
        }}
      >
        {/*
          Drawer.Screen — один пункт меню = один экран.
          name — внутреннее имя (его используют в navigation.navigate("Quiz")).
          component — какой React-компонент показать.
          options.title — подпись в шапке и в меню.
        */}
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Хогвартс" }}
        />
        <Drawer.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Сортировочная шляпа" }}
        />
        <Drawer.Screen
          name="Houses"
          component={HousesScreen}
          options={{ title: "Факультеты" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
