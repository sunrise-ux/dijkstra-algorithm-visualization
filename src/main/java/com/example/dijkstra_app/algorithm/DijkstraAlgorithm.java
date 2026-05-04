package com.example.dijkstra_app.algorithm;

import com.example.dijkstra_app.model.DijkstraResult;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class DijkstraAlgorithm {

    public DijkstraResult findShortestPath(Map<String, Map<String, Integer>> graph,
                                           String start,
                                           String end) {

        // Расстояния от старта до каждой вершины
        Map<String, Integer> distances = new HashMap<>();
        // Предыдущие вершины для восстановления пути
        Map<String, String> previous = new HashMap<>();
        // Множество непосещённых вершин
        Set<String> unvisited = new HashSet<>(graph.keySet());
        for (String vertex : graph.keySet()) {
            distances.put(vertex, Integer.MAX_VALUE);
            previous.put(vertex, null);
        }
        distances.put(start, 0);

        // Список для хранения порядка посещения вершин
        List<String> visitedOrder = new ArrayList<>();

        while (!unvisited.isEmpty()) {
            String current = null;
            int minDist = Integer.MAX_VALUE;
            for (String vertex : unvisited) {
                if (distances.get(vertex) < minDist) {
                    minDist = distances.get(vertex);
                    current = vertex;
                }
            }
            if (current == null || minDist == Integer.MAX_VALUE) {
                break;
            }
            // Помечаем как посещённую
            unvisited.remove(current);
            visitedOrder.add(current);
            if (current.equals(end)) {
                break;  // досрочно выходим, если дошли до цели
            }
            // Если дошли до конечной вершины — можно остановиться
            if (current.equals(end)) {
                break;
            }
            // Обновляем расстояния до соседей
            Map<String, Integer> neighbors = graph.get(current);
            if (neighbors != null) {
                for (Map.Entry<String, Integer> neighbor : neighbors.entrySet()) {
                    String neighborName = neighbor.getKey();
                    int edgeWeight = neighbor.getValue();

                    if (unvisited.contains(neighborName)) {
                        int newDistance = distances.get(current) + edgeWeight;
                        if (newDistance < distances.get(neighborName)) {
                            distances.put(neighborName, newDistance);
                            previous.put(neighborName, current);
                        }
                    }
                }
            }
        }
        // Восстанавливаем путь
        List<String> path = new ArrayList<>();
        if (distances.get(end) != Integer.MAX_VALUE) {
            String step = end;
            while (step != null) {
                path.add(0, step);
                step = previous.get(step);
            }
        }
        return new DijkstraResult(path, distances.get(end), distances, visitedOrder);
    }
}