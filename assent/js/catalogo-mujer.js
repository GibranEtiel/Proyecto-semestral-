document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://my.api.mockaroo.com/users.json?key=eaf6dc10';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const zapatillasContainer = document.getElementById('zapatillas-container');

       
        const zapatillasHombre = data.filter(zapatilla => zapatilla.tipo === 'mujer');
        for (let i = 0; i < zapatillasHombre.length; i += 4) {
            const zapatillasGroup = zapatillasHombre.slice(i, i + 4);

            const row = document.createElement('div');
            row.classList.add('row', 'mt-4');

            zapatillasGroup.forEach(zapatilla => {
                const col = document.createElement('div');
                col.classList.add('col-md-3');

                const card = document.createElement('div');
                card.classList.add('card', 'mb-4', 'shadow-sm');
                card.setAttribute('data-toggle', 'modal');
                card.setAttribute('data-target', '#zapatillaModal');
                card.setAttribute('data-zapatilla-id', zapatilla.id);

                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = zapatilla.imagen;
                img.alt = zapatilla.nombre;

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = zapatilla.nombre;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.innerHTML = `<b><br>Tipo: ${zapatilla.tipo}<br><b>Precio:</b> ${zapatilla.precio}`;

                const comprarBtn = document.createElement('a');
                comprarBtn.classList.add('btn', 'btn-primary');
                comprarBtn.href = 'comprar.html';
                comprarBtn.textContent = 'Agregar al Carro';

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(comprarBtn);

                card.appendChild(img);
                card.appendChild(cardBody);

                col.appendChild(card);
                row.appendChild(col);
            });

            zapatillasContainer.appendChild(row);
        }

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const zapatillaId = card.getAttribute('data-zapatilla-id');
                const zapatilla = zapatillasHombre.find(zapatilla => zapatilla.id === parseInt(zapatillaId));
                mostrarDetallesZapatilla(zapatilla);
            });
        });
    })
    .catch(error => console.log(error));

 
    function mostrarDetallesZapatilla(zapatilla) {
        const modalTitle = document.getElementById('zapatillaModalLabel');
        const modalBody = document.getElementById('zapatillaDetalle');
        modalTitle.textContent = zapatilla.nombre;
        modalBody.innerHTML = `
            <img src="${zapatilla.imagen}" class="img-fluid mb-2" alt="${zapatilla.nombre}">
            <p><b>Descripcion:</b> ${zapatilla.descripcion}</p>
            <p>Tipo: ${zapatilla.tipo}</p>
            <p>Precio: ${zapatilla.precio}</p>
        `;
    }
});