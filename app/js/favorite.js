
const tabla = document.querySelector('#lista-usuarios tbody');
            
let boton = document.getElementById("mostrar")

// let obtusuarios = []
let idusuario = JSON.parse(localStorage.getItem('idpoke'));

console.log('Mostramos el id del usuario');
console.log(idusuario);

boton.addEventListener("click", function() {
    function cargarUsuarios() {
        fetch(`http://localhost:3000/api/usuarios/${idusuario}`)
            .then(respuesta => respuesta.json()) //Indicamos el formato en que se desea obtener la información
            .then(usuarios => {
                console.log(usuarios)
                
                 usuarios.pokefavoritos.forEach( (pokemon, numero) => {
                     const row = document.createElement('tr');
                        row.innerHTML += `
                          <td>${pokemon}</td>
                         `;
                        // console.log(numero);
                      DataPokemons(pokemon, numero);

                    })
                
            }) // Aquí mostramos dicha información
            .catch(error => console.log('Hubo un error : ' + error.message))
    }
    cargarUsuarios();
})
  
const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')

const DataPokemons = async (data, n) => {
    lists__pokemons.innerHTML = '';
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
        const resul = await resp.json();
        // console.log(resul)
        templateHtml=`
        <div class="pokemon__img" id="${n}">
        <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
        <p>${resul.name}</p>
        <button id="${n}" class="btn btn-danger">Eliminar</button>
        </div>
        `
        lists__pokemons.innerHTML+=templateHtml
        
    } catch (error) {
        console.log(error)
    }
}


// Elimando pokemonos - no tocar
window.document.addEventListener('DOMContentLoaded', () => {
    const contenedorpoke = document.getElementById('lists__pokemons');

    contenedorpoke.addEventListener('click', (e) => {
        console.log(e.target)
    })

})


/*** FAVORITOS ***/

// let url = 'http://localhost:3000/api/usuarios/';
// fetch(url)
// .then( response => response.json() )
// .then( data => mostrarData(data) )
// .catch( error => console.log(error) )

// const mostrarData = (data) => {
// console.log(data)
// let body = ""
// for (var i = 0; i < data.length; i++) {
// body+=`<tr><td>${data[i].pokefavoritos}</td><td>${data[i].email}</td></tr>`
// }
// document.getElementById('data').innerHTML = body
// console.log(body)
// }
// mostrarData()
// console.log(data.name)

// document.addEventListener("click", async (e) => {
// if (e.target.matches("button")) {
// const respConfirm = confirm("Eliminar de favoritos?");
// if (respConfirm) {
// const result = await fetch(
// `http://localhost:3000/api/usuarios${e.target.id}`,
// {
// method: "PUT",
// headers: {
// "Content-Type": "application/json",
// },
// }
// );
// const data = await result.json();
// console.log(data);
// cargarPokemones();
// }
// return;
// }
// });
