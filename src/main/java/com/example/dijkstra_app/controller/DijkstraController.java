package com.example.dijkstra_app.controller;

import com.example.dijkstra_app.model.DijkstraResult;
import com.example.dijkstra_app.model.ErrorResponse;
import com.example.dijkstra_app.model.GraphData;
import com.example.dijkstra_app.service.DijkstraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DijkstraController {

    @Autowired
    private DijkstraService dijkstraService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/api/shortest-path")
    @ResponseBody
    public ResponseEntity<?> findShortestPath(@RequestBody GraphData graphData) {

        // Проверка 1: граф не должен быть null
        if (graphData.getGraph() == null || graphData.getGraph().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("EMPTY_GRAPH", "Граф не может быть пустым"));
        }

        // Проверка 2: стартовая вершина не должна быть пустой
        if (graphData.getStart() == null || graphData.getStart().trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("INVALID_START", "Начальная вершина не указана"));
        }

        // Проверка 3: конечная вершина не должна быть пустой
        if (graphData.getEnd() == null || graphData.getEnd().trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("INVALID_END", "Конечная вершина не указана"));
        }

        // Проверка 4: существуют ли такие вершины в графе
        String start = graphData.getStart().trim();
        String end = graphData.getEnd().trim();

        if (!graphData.getGraph().containsKey(start)) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("START_NOT_FOUND",
                            "Начальная вершина '" + start + "' не найдена в графе"));
        }

        if (!graphData.getGraph().containsKey(end)) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("END_NOT_FOUND",
                            "Конечная вершина '" + end + "' не найдена в графе"));
        }

        // Все проверки пройдены — выполняем алгоритм
        DijkstraResult result = dijkstraService.findShortestPath(graphData);

        // Проверка 5: если путь не найден
        if (result.getPath().isEmpty()) {
            return ResponseEntity
                    .ok()
                    .body(new ErrorResponse("NO_PATH",
                            "Путь из " + start + " в " + end + " не существует"));
        }

        return ResponseEntity.ok(result);
    }
}