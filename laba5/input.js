document.querySelectorAll('.target').forEach(target => {
    let isMoving = false; // Флаг для отслеживания перемещения
    let isPinned = false; // Флаг для отслеживания "приклеивания"
    let deltaX, deltaY; // Смещения для перетаскивания
    let originalPosition = {top: target.style.top || '0px', left: target.style.left || '0px'}; // Исходные позиции

    // Сохраняем исходные позиции при инициализации
    originalPosition.top = target.offsetTop + 'px';
    originalPosition.left = target.offsetLeft + 'px';

    target.addEventListener('mousedown', (event) => {
        if (!isPinned) {
            isMoving = true;
            deltaX = event.clientX - target.getBoundingClientRect().left;
            deltaY = event.clientY - target.getBoundingClientRect().top;
        }   
    });

    target.addEventListener('dblclick', () => {
        isPinned = !isPinned;
        if (isPinned) {
            target.style.backgroundColor = 'blue'; // Меняем цвет при "приклеивании"
        } else {
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (isMoving || isPinned) {
            target.style.left = `${event.clientX - deltaX}px`;
            target.style.top = `${event.clientY - deltaY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        // Сбрасываем состояние перемещения только если элемент не приклеен
        if (isMoving) {
            isMoving = false;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (isPinned || isMoving)) {
            // Возвращаем только приклеенный элемент на исходную позицию
            target.style.top = originalPosition.top;
            target.style.left = originalPosition.left;
            isPinned = false; // Сбрасываем флаг приклеивания
            isMoving = false;
            target.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    });
});