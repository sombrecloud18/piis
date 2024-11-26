const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY;
let shapeType = 'circle'; // По умолчанию круг
const shapes = []; // Массив для хранения фигур

// Установка размеров canvas
canvas.width = window.innerWidth - 40; // Учитываем отступы
canvas.height = window.innerHeight * 0.8;

document.getElementById('circleButton').onclick = () => shapeType = 'circle';
document.getElementById('rectangleButton').onclick = () => shapeType = 'rectangle';

// Обработчик для очистки холста
document.getElementById('clearButton').onclick = () => {
    shapes.length = 0; // Очищаем массив фигур
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст
};

canvas.onmousedown = (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
};

canvas.onmousemove = (event) => {
    if (!isDrawing) return;

    const endX = event.offsetX;
    const endY = event.offsetY;

    // Очищаем canvas перед рисованием новой фигуры
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderShapes(); // Перерисовываем все фигуры из массива

    if (shapeType === 'circle') {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fill();
        ctx.closePath();
    } else if (shapeType === 'rectangle') {
        const width = endX - startX;
        const height = endY - startY;
        ctx.beginPath();
        ctx.rect(Math.min(startX, endX), Math.min(startY, endY), Math.abs(width), Math.abs(height));
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.closePath();
    }
};

canvas.onmouseup = (event) => {
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

canvas.onmouseleave = () => {
    isDrawing = false;
};

function renderShapes() {
    shapes.forEach(shape => {
        ctx.beginPath();
        if (shape.type === 'circle') {
            ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
            ctx.fillStyle = shape.fill;
            ctx.fill();
        } else if (shape.type === 'rectangle') {
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
            ctx.fillStyle = shape.fill;
            ctx.fill();
        }
        ctx.closePath();
    });
}