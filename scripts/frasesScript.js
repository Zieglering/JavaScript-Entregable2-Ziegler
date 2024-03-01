const fraseAPI = "https://api.quotable.io/random";
const error = "Uuuuups!";
const traducir_esAPI = "https://es.libretranslate.com/translate";

async function traducir_es(traducir) {
    const response = await fetch(traducir_esAPI, {
        method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'google-translate-v21.p.rapidapi.com'
	},
	body: {
		text_to_translate: traducir,
		dest: 'es'
	}
    });
    const result = await response.json();
}


async function fraseRandom() {
    const response = await fetch(fraseAPI,{method:"GET"});
    const result = await response.json();

    

    try {
        const fraseMostrar = document.querySelector("#fraseAqui")

        const divFrase = document.createElement("div")
        divFrase.classList.add("fraseFondo")
        divFrase.innerHTML = `
        <div class="card fraseContenedor">
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                <p class="textoFrase">“${result.content}”</p>
                <footer class="autorFrase"><p>${result.author}</p></footer>
                </blockquote>
            </div>
        </div>
        `
        fraseMostrar.appendChild(divFrase)
    } catch (error) {
        alert(error)
    }

}








fraseRandom()

