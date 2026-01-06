const formBusqueda = document.querySelector('#form-busqueda');
const inputIngrediente = document.querySelector('#input-ingrediente');
const contenedorResultados = document.querySelector('#resultados');

formBusqueda.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const ingrediente = inputIngrediente.value.trim();

    if (!ingrediente) return;

    contenedorResultados.innerHTML = '';

    try {
        const recetas = await buscarRecetasPorIngrediente(ingrediente);
        renderizarRecetas(recetas);
    } catch (error) {
        mostrarMensaje(error);
    }
});

// HU-04: Búsqueda Funcional de Recetas
const buscarRecetasPorIngrediente = async (ingrediente) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al consultar la API');
    }

    const data = await response.json();

    if (data.meals === null) {
        throw new Error('Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.');
    }

    return data.meals;
};

// HU-05: Renderizado Dinámico de Resultados
const renderizarRecetas = (recetas) => {
    recetas.forEach((receta) => {
        
        const { strMeal, strMealThumb } = receta;

        const cardHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="card h-100">
                    <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <a href="#" class="btn btn-primary">Ver receta</a>
                    </div>
                </div>
            </div>
        `;

        contenedorResultados.innerHTML += cardHTML;
    });
};

// HU-06: Manejo de Búsquedas sin Resultados
const mostrarMensaje = (mensaje) => {
    contenedorResultados.innerHTML = `
        <div class="col-12 text-center">
            <p class="fs-5 text-muted">${mensaje}</p>
        </div>
    `;
};
