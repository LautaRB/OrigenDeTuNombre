const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  
  const nombre = document.getElementById("name").value;

  averiguarPais(nombre);
});

const handleFetch = async (url) => {
  const res = await fetch(url);
  return await handleError(res);
};
const handleError = (res) => {
  if (!res.ok) throw new Error(res.statusText);
  return res;
};

const averiguarPais = async (nombre) => {
  let url = `https://api.nationalize.io/?name=${nombre}`;
  try {
    let res = await handleFetch(url);
    let resJSON = await res.json();
    let paisMasProb = resJSON.country.reduce((a, b) => {
      return a.probability > b.probability ? a : b;
    }, 0);
    const codPais = paisMasProb.country_id;
    url = `https://restcountries.com/v3.1/alpha/${codPais}`;
    res = await handleFetch(url);
    resJSON = await res.json();
    alert(`Probablemente seas de ${resJSON[0].translations.spa.common}`);
  } catch (err) {
    alert(err);
  }
};
