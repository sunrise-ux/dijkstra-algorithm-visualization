package com.example.dijkstra_app.service;

import com.example.dijkstra_app.algorithm.DijkstraAlgorithm;
import com.example.dijkstra_app.model.DijkstraResult;
import com.example.dijkstra_app.model.GraphData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DijkstraService {

    @Autowired
    private DijkstraAlgorithm dijkstraAlgorithm;

    public DijkstraResult findShortestPath(GraphData graphData) {
        return dijkstraAlgorithm.findShortestPath(
                graphData.getGraph(),
                graphData.getStart(),
                graphData.getEnd()
        );
    }
}