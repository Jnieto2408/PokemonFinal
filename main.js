/* Declaramos variable para empezar interactividad */
const pokemon = document.getElementById("pokemon");
const comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", () => {
    pokeInicial();
})


const url = "https://pokeapi.co/api/v2/pokemon/" //URL incompleta del api, ya que solo tendremos en cuenta de manera aleatorea la primera generacion de pokemones, es decir 150.
let pokeInicial = () => {
    console.clear();
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id; //Aqui combinamos url de arriba con numero aleatorio.
    fetch(finalUrl)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos)
            primerPokemon(datos);
        })
        .catch(error => console.log(error))
    rival();
}
let rival = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id; //Aqui combinamos url de arriba con numero aleatorio.
    fetch(finalUrl)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos)
        })
        .catch(error => console.log(error))
}
/* Declaramos funcion para mostrar pokemon inicial*/
let primerPokemon = (datos) => {
    const hp = datos.stats[0].base_stat;
    console.log("HP", hp);
    const imgSrc = datos.sprites.other.dream_world.front_default;
    console.log("URL", imgSrc);
    const pokeNombre = datos.name[0].toUpperCase() + datos.name.slice(1);
    console.log("Nombre", pokeNombre);
    const statAttack = datos.stats[1].base_stat;
    console.log("Ataque", statAttack);
    const statDefense = datos.stats[2].base_stat;
    console.log("Defensa", statDefense);
    const statSpeed = datos.stats[5].base_stat;
    console.log("Velocidad", statSpeed);
    pokemon.innerHTML = `
        <h3>Pokemon Inicial</h3>
        <div class="pokemon">
            <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src=${imgSrc} />
            <h2>${pokeNombre}</h2>
            <div class="stats">
                <div>
                <h3>${statAttack}</h3>
                <p>Attack</p>
                </div>
                <div>
                <h3>${statDefense}</h3>
                <p>Defense</p>
                </div>
                <div>
                <h3>${statSpeed}</h3>
                <p>Speed</p>
                </div>
            </div>
        </div>
  `;
}