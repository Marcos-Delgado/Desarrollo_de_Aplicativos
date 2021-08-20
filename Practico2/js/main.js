const url = "https://610f5d459b698d0017175310.mockapi.io/api/v1/Personas";

document.addEventListener ("DOMContentLoaded",() => {
document.querySelector("#crearPersona").addEventListener("click", () => {
   let nombre = document.querySelector ("#nombre").value;
   let apellido = document.querySelector ("#apellido").value;
   let direccion = document.querySelector ("#direccion").value;
   let titulo = document.querySelector ("#titulo").value;
   let avatar = document.querySelector ("#avatar").value;
   let edad = document.querySelector ("#edad").value;
   console.log(document.querySelector("#apellido"));
   crearPersona(nombre,apellido,direccion,titulo,avatar,edad);
  });
  getPersonas();

})

async function crearPersona(nombre, apellido, direccion, titulo, avatar, edad) {
  await fetch(url, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "nombre": nombre,
          "apellido": apellido,
          "direccion": direccion,
          "titulo": titulo,
          "avatar": avatar,
          "edad": edad,
      })
  }).then(response => {
      if (response.ok) {
          console.log(response)
      } else {
          console.log("Yo aca podria tener una funcion para actualizar")
          console.log("Si no funcione entro aca")
          throw new Error("no pude insertar")
      }
  }).catch((error) =>  {
      console.error("falle porque " + error);
  })
}

async function getPersonas() {
    await fetch(url)
    .then (response => {
        response.json().then(resp => {
            resp.map(persona => {
                let tablePersona = document.querySelector("#personas");
                tablePersona.innerHTML = "";


            //map de las personas
            resp.map(persona => {
                console.log(persona);
                let tablerow = document.createElement("tr");
                let nombreColumna = document.createElement("td");
                let nombre = document.createTextNode(persona.nombre);
                nombreColumna.append(nombre);
                tablerow.append(nombreColumna);
                //columna nombre

                //columna apellido
                let apellido = document.createElement("td");
                apellido.append(document.createTextNode(persona.apellido))
                tablerow.append(apellido);

                //colummna direccion
                let direccion = document.createElement("td")
                direccion.append(document.createTextNode(persona.direccion));
                tablerow.append(direccion)

                //columna titulo
                let titulo = document.createElement("td")
                titulo.append(document.createTextNode(persona.titulo));
                tablerow.append(titulo)

                //columna avatar
                let avatar = document.createElement("td")
                avatar.append(document.createTextNode(persona.avatar));
                tablerow.append(avatar)

                //columna edad
                let edad = document.createElement("td")
                edad.append(document.createTextNode(persona.edad));
                tablerow.append(edad)

                //columna eliminar
                let eliminar = document.createElement("button");
                eliminar.setAttribute("value",persona.id);
                eliminar.append(document.createTextNode("Eliminar"));
                tablerow.append(eliminar);
                eliminar.addEventListener("click", () => {
                    eliminarPersona(eliminar.getAttribute("value"));

                })

                tablePersona.append(tablerow);
            })

            })
        })

    })
}

async function eliminarPersona(id){
    await fetch( url + "/" + id,{
        method: "DELETE"
    }).then ( (response)=>  {
        if(response.ok) {
            getPersonas();
        }
    })

}