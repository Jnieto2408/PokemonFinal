/* Declaramos variable para empezar interactividad */
const pokemon = document.getElementById("pokemon");
const comenzar = document.getElementById("comenzar");
const instru = document.getElementById("instru");
comenzar.addEventListener("click", () => {
    pokeInicial();
})

/* Incluimos array para evaluacion de ganador de batala */
let array = [];

const url = "https://pokeapi.co/api/v2/pokemon/" //URL incompleta del api, ya que solo tendremos en cuenta de manera aleatorea la primera generacion de pokemones, es decir 150.
let pokeInicial = () => {
    console.clear();
    comenzar.style.display = "none";
    instru.style.display = "none";
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id; //Aqui combinamos url de arriba con numero aleatorio.
    fetch(finalUrl)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos)
            primerPokemon(datos);
        })
        .catch(error => console.log(error))
}
/* Declaramos funcion para mostrar pokemon inicial*/
let primerPokemon = (datos) => {
    const imgSrc = datos.sprites.other.dream_world.front_default;
    console.log("URL", imgSrc);
    const miPokemon = {
        vida: datos.stats[0].base_stat,
        nombre: datos.name[0].toUpperCase() + datos.name.slice(1),
        ataque: datos.stats[1].base_stat,
        defensa: datos.stats[2].base_stat,
        velocidad: datos.stats[5].base_stat
    }
    console.log(typeof miPokemon, miPokemon)
    pokemon.innerHTML = `
        <div>
            <h3>Pokemon Inicial</h3>
            <div class="pokemon">
                <p class="hp">
                    <span>HP</span>
                    ${miPokemon.vida}
                </p>
                <img src=${imgSrc} />
                <h2>${miPokemon.nombre}</h2>
                <div class="stats">
                    <div>
                    <h3>${miPokemon.ataque}</h3>
                    <p>Attack</p>
                    </div>
                    <div>
                    <h3>${miPokemon.defensa}</h3>
                    <p>Defense</p>
                    </div>
                    <div>
                    <h3>${miPokemon.velocidad}</h3>
                    <p>Speed</p>
                    </div>
                </div>
            </div>
            <button id="batallaPokemon">Batalla!!!</button>
        </div>
        <div id="pokeRival"></div>
  `;
  array.push(miPokemon.ataque);
  const batallaPokemon = document.getElementById("batallaPokemon");
  batallaPokemon.addEventListener("click", () =>{
    console.log("batalla");
    gimnasioPokemon();
    batallaPokemon.style.display = "none";
  })
}
let gimnasioPokemon = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id; //Aqui combinamos url de arriba con numero aleatorio para escoger pokemon a enfrentar.
    fetch(finalUrl)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos)
            rival(datos);
        })
        .catch(error => console.log(error))
}
let rival = (datos) => {
    const imgSrc = datos.sprites.other.dream_world.front_default;
    console.log("URL", imgSrc);
    const pokemonRival = {
        vida: datos.stats[0].base_stat,
        nombre: datos.name[0].toUpperCase() + datos.name.slice(1),
        ataque: datos.stats[1].base_stat,
        defensa: datos.stats[2].base_stat,
        velocidad: datos.stats[5].base_stat
    }
    console.log(typeof pokemonRival, pokemonRival);
    const pokeRival = document.getElementById("pokeRival");
    pokeRival.innerHTML = `
        <button id="ataque">Ataque!</button>
        <div>
            <h3>Pokemon Rival</h3>
            <div class="pokemon">
                <p class="hp">
                    <span>HP</span>
                    ${pokemonRival.vida}
                </p>
                <img src=${imgSrc} />
                <h2>${pokemonRival.nombre}</h2>
                <div class="stats">
                    <div>
                    <h3>${pokemonRival.ataque}</h3>
                    <p>Attack</p>
                    </div>
                    <div>
                    <h3>${pokemonRival.defensa}</h3>
                    <p>Defense</p>
                    </div>
                    <div>
                    <h3>${pokemonRival.velocidad}</h3>
                    <p>Speed</p>
                    </div>
                </div>
            </div>
        </div>
    `
    array.push(pokemonRival.defensa);
    const ataque = document.getElementById("ataque")
    ataque.addEventListener("click", () => {
        decision();
        ataque.style.display="none";
    })
}
const decision = () => {
    let evaluo = array[0] - array[1];
    evaluo > 0 ? notificoGanador() : notificoPerdedor();
}
const notificoGanador = () => {
    Swal.fire({
        icon: 'success',
        title: 'GANADOR',
        text: 'Lo lograste, si quieres volver a competir refresca la pagina',
})
}
const notificoPerdedor = () => {
    Swal.fire({
        icon: 'error',
        title: 'Perdedor',
        text: 'No tuviste suerte, si quieres volver a competir refresca la pagina',
})
}