// function GetCountryAPI (){
//     return fetch("https://restcountries.com/v3.1/name/Italy?fullText=true")
// }

// GetCountryAPI().then((result) => result.json()).then((resultdata) => console.log(resultdata))


// function createInfoCountry (countryObject) {
//     console.log(weatherObject)

// }

// const countryButton = document.querySelector (".country-button")
// countryButton.addEventListener("click", (event) =>{
// const inputElement = document.querySelector(".country-form")
// const tittleElement = document.querySelector(".country-tittle")
// })

// const listElement = document.querySelector(".country-list");
// function showOurPage (data) {
//     const listElement = document.querySelector(".country-list");
//     let number = 0 
//     const dynamicMarking =  data.map(country => {
//         const elementOfLi = `
//          <li class="country-item">
//             <h2 class="country-capital">${country.capital}</h2>
//             <p class="country-population">${country.population}</p>
//             <p class="country-languages">${country.languages}</p>
//             <img class="country-flag" src="" alt="" ${country.flags}>
//         </li> `
//         listElement.insertAdjacentHTML(`beforeend` , elementOfLi)
//         return elementOfLi
//     })

// }
// showOurPage()
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