package com.example.dijkstra_app.model;

import java.util.Map;

public class GraphData {
    private Map<String, Map<String, Integer>> graph;
    private String start;
    private String end;

    public Map<String, Map<String, Integer>> getGraph() {
        return graph;
    }

    public void setGraph(Map<String, Map<String, Integer>> graph) {
        this.graph = graph;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }
}