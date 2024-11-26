const svg = document.getElementById('drawingArea');
let isDrawing = false;
let startX, startY;
let shapeType = 'circle'; // По умолчанию круг
const shapes = []; // Массив для хранения фигур

document.getElementById('circleButton').onclick = () => shapeType = 'circle';
document.getElementById('rectangleButton').onclick = () => shapeType = 'rectangle';

// Обработчик для очистки экрана
document.getElementById('clearButton').onclick = () => {
    shapes.length = 0; // Очищаем массив фигур
    renderShapes(); // Перерисовываем SVG
};

svg.onmousedown = (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
};

svg.onmousemove = (event) => {
    if (!isDrawing) return;

    const endX = event.offsetX;
    const endY = event.offsetY;

    // Очищаем SVG перед рисованием новой фигуры
    svg.innerHTML = '';
    renderShapes(); // Перерисовываем все фигуры из массива

    if (shapeType === 'circle') {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startX);
        circle.setAttribute('cy', startY);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'rgba(0, 0, 255, 0.5)');
        svg.appendChild(circle);
    } else if (shapeType === 'rectangle') {
        const width = endX - startX;
        const height = endY - startY;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', Math.min(startX, endX));
        rect.setAttribute('y', Math.min(startY, endY));
        rect.setAttribute('width', Math.abs(width));
        rect.setAttribute('height', Math.abs(height));
        rect.setAttribute('fill', 'rgba(255, 0, 0, 0.5)');
        svg.appendChild(rect);
    }
};

svg.onmouseup = (event) => {
    isDrawing = false;
    const endX = event.offsetX;
    const endY = event.offsetY;

    if (shapeType === 'circle') {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        shapes.push({
            type: 'circle',
            cx: startX,
            cy: startY,
            r: radius,
            fill: 'rgba(0, 0, 255, 0.5)'
        });
    } else if (shapeType === 'rectangle') {
        shapes.push({
            type: 'rectangle',
            x: Math.min(startX, endX),
            y: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            fill: 'rgba(255, 0, 0, 0.5)'
        });
    }

    renderShapes(); // Перерисовываем все фигуры из массива
};

svg.onmouseleave = () => {
    isDrawing = false;
};

function renderShapes() {
    svg.innerHTML = ''; // Очищаем SVG
    shapes.forEach(shape => {
        let element;
        if (shape.type === 'circle') {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            element.setAttribute('cx', shape.cx);
            element.setAttribute('cy', shape.cy);
            element.setAttribute('r', shape.r);
            element.setAttribute('fill', shape.fill);
        } else if (shape.type === 'rectangle') {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            element.setAttribute('x', shape.x);
            element.setAttribute('y', shape.y);
            element.setAttribute('width', shape.width);
            element.setAttribute('height', shape.height);
            element.setAttribute('fill', shape.fill);
        }
        svg.appendChild(element); // Добавляем фигуру в SVG
    });
}