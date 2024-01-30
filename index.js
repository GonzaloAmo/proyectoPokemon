const url = "https://pokeapi.co/api/v2/pokemon/";
const resultado = document.getElementById("resultado");
let detallesPokemon = null;

async function obtenerDatosPokemon() {
    try {
        for (let i = 1; i < 41; i++) {
            const response = await axios.get(`${url}${i}`);
            const datos = response.data;

            const { sprites: { other: { 'official-artwork': { front_default } } } } = datos;
            const imgElement = document.createElement("img");
            imgElement.src = front_default;
            resultado.appendChild(imgElement);

            imgElement.style.cursor = "pointer";

            imgElement.addEventListener("mouseenter", () => {
                imgElement.style.opacity = 0.8; // Puedes ajustar la opacidad según tus preferencias
            });

            imgElement.addEventListener("mouseleave", () => {
                imgElement.style.opacity = 1;
            });

            imgElement.addEventListener("click", () => {
                detallesPokemon = {
                    name: datos.name,
                    abilities: datos.abilities.map(ability => ability.ability.name)
                };

                // Mostrar detalles en la alerta Swal.fire
                Swal.fire({
                    title: "Detalles del Pokémon",
                    html: `<p><strong>Nombre:</strong> ${datos.name}</p>
                       <p><strong>Habilidades:</strong> ${datos.abilities.map(a => a.ability.name).join(', ')}</p>
                       <img src="${datos.sprites.other['official-artwork'].front_default}" alt="Imagen de ${datos.name}" style="max-width: 80%;">`,
                    icon: "info"
                });
            });
        }
    } catch (error) {
        console.error(error);
    }
}

obtenerDatosPokemon();
