document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://my.api.mockaroo.com/users.json?key=eaf6dc10';
    let data = [];

    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            data = responseData;
            renderCarousel();
        })
        .catch(error => console.error('Error al obtener datos:', error));

    function renderCarousel() {
        const carouselInner = document.getElementById('carousel-inner-custom');
        carouselInner.innerHTML = ''; // Limpiar contenido previo

        let firstItemActive = true;

        // Definir cuántas veces se repite el proceso de creación de carrusel
        const numberOfSlides = Math.ceil(data.length / 3);

        for (let i = 0; i < numberOfSlides; i++) {
            const zapatillasGroup = getRandomZapatillas(data, 3);

            const div = document.createElement('div');
            div.className = `carousel-item ${firstItemActive ? 'active' : ''}`;
            firstItemActive = false; // Solo el primer item será 'active'

            const row = document.createElement('div');
            row.className = 'row justify-content-center';
            zapatillasGroup.forEach(zapatilla => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card mb-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#zapatillaModalCustom">
                        <img src="${zapatilla.imagen}" class="card-img-top" alt="${zapatilla.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${zapatilla.nombre}</h5>
                            <p class="card-text">Tipo: ${zapatilla.tipo}</p>
                            <p class="card-text"><b>${zapatilla.precio}</b></p>
                        </div>
                    </div>
                `;
                row.appendChild(col);

                // Agregar el evento click para mostrar detalles
                col.querySelector('.card').addEventListener('click', () => {
                    mostrarDetallesZapatilla(zapatilla);
                });
            });

            div.appendChild(row);
            carouselInner.appendChild(div);
        }
    }

    // Función para obtener zapatillas aleatorias
    function getRandomZapatillas(data, count) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Controlar el cambio de diapositivas para actualizar el carrusel
    const carousel = document.getElementById('carouselExampleControls');
    carousel.addEventListener('slid.bs.carousel', renderCarousel);

    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000 // Cambiar el intervalo aquí (en milisegundos)
    });
});

function mostrarDetallesZapatilla(zapatilla) {
    const zapatillaDetalleCustom = document.getElementById('zapatillaDetalleCustom');
    zapatillaDetalleCustom.innerHTML = `
        <img src="${zapatilla.imagen}" class="img-fluid mb-3" alt="${zapatilla.nombre}">
        <h5>${zapatilla.nombre}</h5>
        <p><b>Descripción:</b> ${zapatilla.descripcion}</p>
        <p>Tipo: ${zapatilla.tipo}</p>
        <p><b>Precio:</b> ${zapatilla.precio}</p>
    `;

    const zapatillaModalCustom = new bootstrap.Modal(document.getElementById('zapatillaModalCustom'));

    // Limpiar el contenido del modal antes de abrirlo
    zapatillaModalCustom._element.querySelector('.modal-content .btn-close').addEventListener('click', () => {
        zapatillaDetalleCustom.innerHTML = '';
    });

    zapatillaModalCustom.show();
}

