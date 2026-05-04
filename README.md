# Алгоритм Дейкстры — визуализация

Клиент-серверное приложение для визуализации работы алгоритма Дейкстры.  
Проект выполнен в рамках курсовой работы по дисциплине «Алгоритмы и структуры данных».

## О проекте

Приложение позволяет:
- Задать взвешенный граф в формате JSON
- Найти кратчайший путь между двумя вершинами
- Посмотреть пошаговый порядок обработки вершин
- Получить визуализацию графа с выделением кратчайшего пути

## Технологии

**Backend:**
- Java 17
- Spring Boot 4.0.6
- Maven

**Frontend:**
- HTML5 / CSS3
- JavaScript (ES6)
- SVG для визуализации

## Формат входных данных
Граф задаётся в формате JSON:
{
  "A": {"B": 4, "C": 2},
  "B": {"A": 4, "D": 5},
  "C": {"A": 2, "D": 8, "E": 10},
  "D": {"B": 5, "C": 8, "F": 3},
  "E": {"C": 10, "F": 4},
  "F": {"D": 3, "E": 4}
}
Ключ — вершина
Значение — объект, где ключи — соседние вершины, значения — веса рёбер

## Пример запроса API
POST http://localhost:8080/api/shortest-path
Body (JSON):
{
  "graph": {
    "A": {"B": 4, "C": 2},
    "B": {"A": 4, "D": 5},
    "C": {"A": 2, "D": 8},
    "D": {"B": 5, "C": 8}
  },
  "start": "A",
  "end": "D"
}

Ответ:
{
  "path": ["A", "B", "D"],
  "distance": 9,
  "distances": {"A": 0, "B": 4, "C": 2, "D": 9},
  "visitedOrder": ["A", "C", "B", "D"]
}

## Структура проекта
src/
├── main/
│   ├── java/com/example/dijkstraapp/
│   │   ├── algorithm/DijkstraAlgorithm.java
│   │   ├── controller/DijkstraController.java
│   │   ├── service/DijkstraService.java
│   │   ├── model/DijkstraResult.java
|   |   ├── model/ErrorResponse.java
|   |   ├── model/GraphData.java
|   |   └── DijkstraApplication.java
│   └── resources/
│       ├── static/
│       │   ├── css/style.css
│       │   └── js/script.js
│       ├── templates/index.html
│       └── application.properties
└── pom.xml
