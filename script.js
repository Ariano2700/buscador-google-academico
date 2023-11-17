const apiKey = "6556be045fda6ff151484671";

function alertNoComplete(title, text) {
  const alertNoComplete = Swal.fire({
    title: title,
    text: text,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
  return alertNoComplete;
}

async function fetchURL(input) {
  const urlFetch = `https://api.serpdog.io/scholar?api_key=${apiKey}&q=${input}`;
  try {
    const response = await fetch(urlFetch, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    if (data) {
      const { scholar_results } = data;

      const results = data.scholar_results.map(
        ({ title, title_link, snippet }) => ({
          title: title,
          title_link: title_link,
          snippet: snippet,
        })
      );
      return results;
    } else {
      console.error("Error al obtener la data");
    }
  } catch (error) {
    console.error(error);
  }
}
async function showResults() {
  const resultados = document.getElementById("resultados");
  const inputSearch = document.getElementById("buscadorID");

  if (inputSearch && inputSearch.value) {
    const urlResults = await fetchURL(inputSearch.value);

    resultados.innerHTML = "";
    for (const { title, title_link, snippet } of urlResults) {
      let resultToShow = `
        <div>
          <h2><a href="${title_link}" target="_blank" class="resultsSearch" id="resultsSearch">${title}</a></h2>
          <p class="descriptionResult" id="descriptionResult">${snippet}</p>
        </div>`;
      //console.log(title,"RESUMEN",snippet)
      resultados.innerHTML += resultToShow;
    }
  } else {
    const tituloError = "Buscador vacio";
    const textError =
      "El buscador esta vacio y no hay ni un valor para la busqueda";
    alertNoComplete(tituloError, textError);
    console.error("Ingresa un valor de búsqueda válido");
  }
}

const btnSearch = document.getElementById("btn");
btnSearch.addEventListener("click", async () => {
  await showResults();
});
