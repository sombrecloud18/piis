document.querySelectorAll('.target').forEach(target => {
    let isMoving = false; // Флаг для отслеживания перемещения
    let isPinned = false; // Флаг для отслеживания режима "следующий за пальцем"
    let deltaX, deltaY; // Смещения для перетаскивания
    let originalPosition = { top: target.offsetTop + 'px', left: target.offsetLeft + 'px' }; // Исходные позиции

    target.addEventListener('mousedown', startMoving);
    target.addEventListener('touchstart', startMoving);
    
    target.addEventListener('dblclick', () => {
        isPinned = !isPinned;
        target.style.backgroundColor = isPinned ? 'blue' : 'red';
    });

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    
    document.addEventListener('mouseup', stopMoving);
    document.addEventListener('touchend', stopMoving);

    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            // Если второй палец касается экрана, возвращаем элемент на исходную позицию
            target.style.top = originalPosition.top;
            target.style.left = originalPosition.left;
            isMoving = false;
            isPinned = false;
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    });

    function startMoving(event) {
        if (!isPinned) {
            isMoving = true;
            const touch = event.touches ? event.touches[0] : event; // Если это touch-событие
            deltaX = touch.clientX - target.getBoundingClientRect().left;
            deltaY = touch.clientY - target.getBoundingClientRect().top;
        }
    }

    function move(event) {
        if (isMoving || isPinned) {
            const touch = event.touches ? event.touches[0] : event;
            target.style.left = `${touch.clientX - deltaX}px`;
            target.style.top = `${touch.clientY - deltaY}px`;
        }
    }

    function stopMoving() {
        if (isMoving) {
            isMoving = false;
        }
    }
});