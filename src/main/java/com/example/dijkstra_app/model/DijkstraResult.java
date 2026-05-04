package com.example.dijkstra_app.model;

import java.util.List;
import java.util.Map;

public class DijkstraResult {
    private List<String> path;
    private int distance;
    private Map<String, Integer> distances;
    private List<String> visitedOrder;

    public DijkstraResult(List<String> path, int distance,
                          Map<String, Integer> distances,
                          List<String> visitedOrder) {
        this.path = path;
        this.distance = distance;
        this.distances = distances;
        this.visitedOrder = visitedOrder;
    }

    // Геттеры (сеттеры не обязательны, но можно добавить)
    public List<String> getPath() { return path; }
    public int getDistance() { return distance; }
    public Map<String, Integer> getDistances() { return distances; }
    public List<String> getVisitedOrder() { return visitedOrder; }
}