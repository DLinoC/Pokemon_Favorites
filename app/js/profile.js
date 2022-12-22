
const nombre=document.getElementById("nombre")
const apellido=document.getElementById("apellido")
const email=document.getElementById("email")
let idusuario = JSON.parse(localStorage.getItem('idpoke'));
const usuario=document.getElementById("usuario")
const contrasenia=document.getElementById("password")

const editar=document.getElementById("editar")
const guardar=document.getElementById("guardar")
const eliminar=document.getElementById("eliminar")

editar.addEventListener("click",(e)=>{
    e.preventDefault()
    nombre.disabled = false
    apellido.disabled = false
    email.disabled = false
    usuario.disabled = false
    contrasenia.disabled = false
})

// Mostrar un usuario por ID
function getUserbyId(id){
    fetch(`http://localhost:3000/api/usuarios/${id}`)
    .then((response) => response.json())
    .then((data)=>{

        nombre.value=data.nombre;
        apellido.value=data.apellido;
        email.value=data.email;
        usuario.value=data.usuario;
        contrasenia.value=data.password;

        guardar.addEventListener("click",(e)=>{
        e.preventDefault()
            fetch(`http://localhost:3000/api/usuarios/${id}`,{
                method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    nombre: nombre.value,
                    apellido: apellido.value,
                    email: email.value,
                    usuario: usuario.value,
                    password: contrasenia.value,
                  }),
                })
            .then(response => response.json())
            .then(data => {  
                location.reload()
            })
        })
        
        eliminar.addEventListener("click",(e)=>{
        e.preventDefault()
            fetch(`http://localhost:3000/api/usuarios/${id}`,{
                method: "DELETE",
                })
            .then(response => response.json())
            .then(data => { 

                console.log(data);
                location.reload()
            })
        })
    })
    .catch( (e) =>{
        console.error(e);
        localStorage.removeItem('idpoke');
        window.location.href="login.html"
    })
}
// Muestra solo uno ( por ID)
getUserbyId(idusuario);
