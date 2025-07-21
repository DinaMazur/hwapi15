function GetCountryAPI (){
    return fetch("https://restcountries.com/v3.1/name/Italy?fullText=true")
}

GetCountryAPI().then((result) => result.json()).then((resultdata) => console.log(resultdata))


function createInfoCountry (countryObject) {
    console.log(weatherObject)

}

const countryButton = document.querySelector (".country-button")
countryButton.addEventListener("click", (event) =>{
const inputElement = document.querySelector(".country-form")
const tittleElement = document.querySelector(".country-tittle")
})