function generateContent() {
    const container = document.getElementById('products-container');
    shirts.forEach((shirt, index) => { 
        const shirtDiv = document.createElement('div');
        shirtDiv.className = 'shirt';

        const shirtName = document.createElement('h2');
        shirtName.textContent = shirt.name || "Без названия";
        shirtDiv.appendChild(shirtName);

        const colorCount = document.createElement('p');
        const numColors = Object.keys(shirt.colors).length;
        colorCount.textContent = `Можно выбрать из ${numColors} цветов`;
        colorCount.className = 'color-count';
        shirtDiv.appendChild(colorCount);

        const firstColor = Object.keys(shirt.colors)[0];
        const frontImg = document.createElement('img');
        frontImg.src = shirt.colors[firstColor].front || shirt.default.front;
        frontImg.alt = `${shirt.name} - передняя сторона (${firstColor})`;
        shirtDiv.appendChild(frontImg);

        const quickViewButton = document.createElement('a');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.className = 'button';
        quickViewButton.href = '#';
        shirtDiv.appendChild(quickViewButton);

        const seePageButton = document.createElement('a');
        seePageButton.textContent = 'See Page';
        seePageButton.className = 'button';
        seePageButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            localStorage.setItem('selectedShirtId', index);
            window.location.href = 'details.html'; 
        });
        
        shirtDiv.appendChild(seePageButton);
        container.appendChild(shirtDiv);
    });
}

document.addEventListener('DOMContentLoaded', generateContent);