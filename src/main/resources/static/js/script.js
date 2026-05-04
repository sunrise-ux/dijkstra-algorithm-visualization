// Предопределённые координаты для вершин
const nodePositions = {
    'A': {x: 100, y: 200},
    'B': {x: 250, y: 80},
    'C': {x: 250, y: 320},
    'D': {x: 400, y: 150},
    'E': {x: 400, y: 350},
    'F': {x: 550, y: 200},
    'G': {x: 700, y: 100},
    'H': {x: 700, y: 300},
    'I': {x: 450, y: 250},
    'J': {x: 600, y: 350},
    'K': {x: 750, y: 250},
    '1': {x: 100, y: 100},
    '2': {x: 250, y: 100},
    '3': {x: 400, y: 100},
    '4': {x: 550, y: 100}
};

let currentPath = [];

function drawErrorMessage(message, isError = true) {
    const svg = document.getElementById('graphSvg');
    svg.innerHTML = '';

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 400);
    text.setAttribute('y', 250);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '18');
    text.setAttribute('fill', isError ? '#ff4444' : '#ff9800');
    text.setAttribute('font-weight', 'bold');
    text.textContent = message;
    svg.appendChild(text);

    currentPath = [];
}

function drawGraph(graph, path) {
    const svg = document.getElementById('graphSvg');
    svg.innerHTML = '';
    const nodes = new Set();
    const edges = [];

    for (let from in graph) {
        nodes.add(from);
        for (let to in graph[from]) {
            edges.push({from, to, weight: graph[from][to]});
            nodes.add(to);
        }
    }

    // Рисуем рёбра
    for (let edge of edges) {
        const fromPos = nodePositions[edge.from];
        const toPos = nodePositions[edge.to];
        if (!fromPos || !toPos) continue;

        const isInPath = path && path.includes(edge.from) && path.includes(edge.to) &&
                        Math.abs(path.indexOf(edge.from) - path.indexOf(edge.to)) === 1;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromPos.x);
        line.setAttribute('y1', fromPos.y);
        line.setAttribute('x2', toPos.x);
        line.setAttribute('y2', toPos.y);
        line.setAttribute('stroke', isInPath ? '#4caf50' : '#999');
        line.setAttribute('stroke-width', isInPath ? 4 : 2);
        line.setAttribute('marker-end', isInPath ? 'url(#arrow)' : '');
        svg.appendChild(line);

        // Вес ребра
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX);
        text.setAttribute('y', midY - 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '14');
        text.setAttribute('fill', '#d32f2f');
        text.setAttribute('font-weight', 'bold');
        text.textContent = edge.weight;
        svg.appendChild(text);
    }

    // Рисуем вершины
    for (let node of nodes) {
        const pos = nodePositions[node];
        if (!pos) continue;

        const isInPath = path && path.includes(node);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', 25);
        circle.setAttribute('fill', isInPath ? '#4caf50' : '#667eea');
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', 3);
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '16');
        text.setAttribute('font-weight', 'bold');
        text.textContent = node;
        svg.appendChild(text);
    }

    // Стрелка
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#4caf50');
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);
}

function loadExample() {
    const exampleGraph = {
        "A": {"B": 4, "C": 2},
        "B": {"A": 4, "D": 5},
        "C": {"A": 2, "D": 8, "E": 10},
        "D": {"B": 5, "C": 8, "F": 3},
        "E": {"C": 10, "F": 4},
        "F": {"D": 3, "E": 4}
    };
    document.getElementById('graphInput').value = JSON.stringify(exampleGraph, null, 2);
    document.getElementById('startVertex').value = 'A';
    document.getElementById('endVertex').value = 'F';
    drawGraph(exampleGraph, []);
}

function clearAll() {
    document.getElementById('graphInput').value = '';
    document.getElementById('startVertex').value = '';
    document.getElementById('endVertex').value = '';
    document.getElementById('pathResult').innerHTML = '—';
    document.getElementById('distanceResult').innerHTML = '—';
    document.getElementById('distancesResult').innerHTML = '—';
    document.getElementById('visitedOrder').innerHTML = '—';

    currentPath = [];
}

function displayResults(result, graph) {
    document.getElementById('pathResult').innerHTML = result.path.join(' → ');
    document.getElementById('distanceResult').innerHTML = result.distance;
    document.getElementById('distancesResult').innerHTML = JSON.stringify(result.distances, null, 2);
    document.getElementById('visitedOrder').innerHTML = result.visitedOrder.join(' → ');

    drawGraph(graph, result.path);
}

function showError(errorType, errorMessage) {
    document.getElementById('pathResult').innerHTML = '❌ Ошибка';
    document.getElementById('distanceResult').innerHTML = '—';
    document.getElementById('distancesResult').innerHTML = errorMessage;
    document.getElementById('visitedOrder').innerHTML = errorType;

    drawErrorMessage(errorMessage, true);
}

async function runDijkstra() {
    try {
        const graphText = document.getElementById('graphInput').value;

        if (!graphText.trim()) {
            alert('❌ Ошибка: введите описание графа в формате JSON');
            return;
        }

        let graph;
        try {
            graph = JSON.parse(graphText);
        } catch (e) {
            alert('❌ Ошибка: неверный формат JSON\n\n' + e.message);
            return;
        }

        const start = document.getElementById('startVertex').value.trim();
        const end = document.getElementById('endVertex').value.trim();

        if (!start) {
            alert('❌ Ошибка: укажите начальную вершину');
            return;
        }
        if (!end) {
            alert('❌ Ошибка: укажите конечную вершину');
            return;
        }

        if (Object.keys(graph).length === 0) {
            alert('❌ Ошибка: граф не может быть пустым');
            return;
        }

        const response = await fetch('/api/shortest-path', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({graph, start, end})
        });

        const result = await response.json();

        if (result.error) {
            showError(result.error, result.message);
            return;
        }

        if (!result.path || result.path.length === 0) {
            document.getElementById('pathResult').innerHTML = '❌ Путь не найден';
            document.getElementById('distanceResult').innerHTML = '∞';
            document.getElementById('distancesResult').innerHTML = 'Путь не существует между указанными вершинами';
            document.getElementById('visitedOrder').innerHTML = '—';

            // Очищаем SVG и показываем сообщение
            const svg = document.getElementById('graphSvg');
            svg.innerHTML = '';

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', 400);
            text.setAttribute('y', 250);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '18');
            text.setAttribute('fill', '#ff9800');
            text.textContent = 'Путь из ' + start + ' в ' + end + ' не существует';
            svg.appendChild(text);

            currentPath = [];
            return;
        }

        displayResults(result, graph);

    } catch (error) {
        console.error('Ошибка:', error);
        alert('❌ Ошибка соединения с сервером. Убедитесь, что приложение запущено на порту 8080');
    }
}


// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('runBtn').addEventListener('click', runDijkstra);
    document.getElementById('exampleBtn').addEventListener('click', loadExample);
    document.getElementById('clearBtn').addEventListener('click', clearAll);

    // Не загружаем пример при старте — оставляем поле пустым
    // loadExample();
});