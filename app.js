
const input = document.getElementById("search");
const output = document.getElementById("country-list");
let timeoutId;

input.addEventListener("input", () => {
  clearTimeout(timeoutId);
  const query = input.value.trim();
  if (!query) return output.innerHTML = "";

  timeoutId = setTimeout(() => {
    fetch(`https://restcountries.com/v2/name/${query}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        output.innerHTML = "";

        if (data.length > 10) {
          return PNotify.info({ text: "Забагато результатів, уточніть запит." });
        }

        if (data.length > 1) {
          output.innerHTML = "<ul>" + data.map(c => `<li>${c.name}</li>`).join("") + "</ul>";
        } else {
          const c = data[0];
          output.innerHTML = `
            <h2>${c.name}</h2>
            <p>Столиця: ${c.capital}</p>
            <p>Населення: ${c.population.toLocaleString()}</p>
            <p>Мови: ${c.languages.map(l => l.name).join(", ")}</p>
            <img src="${c.flag}" width="150" />
          `;
        }
      })
      .catch(() => PNotify.error({ text: "Країну не знайдено." }));
  }, 500);
});