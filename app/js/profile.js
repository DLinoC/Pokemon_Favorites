
const nombre=document.getElementById("nombre")
const apellido=document.getElementById("apellido")
const email=document.getElementById("email")
const usuario=document.getElementById("usuario")
const contraseña=document.getElementById("contraseña")

const editar=document.getElementById("editar")
const guardar=document.getElementById("guardar")
const eliminar=document.getElementById("eliminar")

editar.addEventListener("click",(e)=>{
    e.preventDefault()
    nombre.disabled = false
    apellido.disabled = false
    email.disabled = false
    usuario.disabled = false
    contraseña.disabled = false
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
        contraseña.value=data.contraseña;

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
                    contraseña: contraseña.value,
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
                location.reload()
            })
        })
    })
}

// Muestra solo uno ( por ID)
getUserbyId('63a3d69975e20d25836d0b9e');
