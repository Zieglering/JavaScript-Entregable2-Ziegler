const fraseAPI = "https://api.quotable.io/random";

async function fraseRandom() {
    const response = await fetch(fraseAPI,{method:"GET"});
    const result = await response.json();
    // console.table(result)

    

    try {
        const fraseMostrar = document.querySelector("#fraseAqui")

        const divFrase = document.createElement("div")
        divFrase.classList.add("fraseContenedor")
        divFrase.innerHTML = `
        <h4 class="fraseTitulo">${result.tags}</h4>
        <h2 class="fraseContenido">"${result.content}"</h2>
        <h4 class="fraseAutor">${result.author}</h4>
        `
        fraseMostrar.appendChild(divFrase)
    } catch (error) {
        alert(error)
    }

}

fraseRandom()