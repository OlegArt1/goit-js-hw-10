import { fetchUsers } from "./fetchUsers.js";

const body = document.querySelector("body");

const searchBox = document.querySelector("#search-box");

const countryList = document.querySelector(".country-list");

const countryInfo = document.querySelector(".countrt-info");

searchBox.style.marginLeft = '20px';

searchBox.style.marginTop = '20px';

const DEBOUNCE_DELAY = 300;

function renderCountryIndexList(countries, index)
{
    const markup = countries.filter((country) => country.name.common[0] === index).map((country) =>
    {
        return "<br/>" +
               "<li class='country-item'>" +
                   "<div class='country-article'>" +
                       `<a class='country-link' href='${country.flags.png}'>` +
                           `<img class='country-image' src='${country.flags.svg}' width='50' height='30' title='{country.name.official}' alt='{country.name.official}'/>` +
                       "</a>" +
                       "<span>" +
                           `<b class='country-title'>${country.name.common}</b>` +
                       "</span>" +
                   "</div>" +
               "</li>";

    }).sort().join("");
    
    countryList.innerHTML += markup;
}
function renderCountryList(countries, text)
{
    const markup = countries.filter((country) => country.name.common === text).map((country) =>
    {
        return "<br/>" +
               "<li class='country-item'>" +
                   "<div class='country-article'>" +                       
                       "<b class='country-label'>Flag:</b>" +
                       `<a class='country-link' href='${country.flags.png}'>` +
                           `<img class='country-image' src='${country.flags.svg}' width='200' height='100' title='{country.name.official}' alt='{country.name.official}'/>` +
                       "</a>" +
                   "</div>" +
                   "<br/>" +
                   "<p>" +
                       "<b class='country-label'>Name country:</b>" +
                       `<i class='country-name'>${country.name.official};</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Area:</b>" +
                       `<i class='country-area'>${country.area} m<sup>2</sup>;</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Continent:</b>" +
                       `<i class='country-region'>${country.continents};</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Subcontinent:</b>" +
                       `<i class='country-subregion'>${country.subregion};</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Population:</b>" +
                       `<i class='country-population'>${country.population} people;</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Capital:</b>" +
                       `<i class='country-capital'>${country.capital};</i>` +
                   "</p>" +
                   "<p>" +
                       "<b class='country-label'>Languages:</b>" +
                       `<i class='country-languages'>${Object.values(country.languages).join(", ")};</i>` +
                   "</p>" +
                   "<br/>" +
               "</li>";
            
    }).sort().join("");
    
    countryList.innerHTML += markup;
}
function clearList()
{
    countryList.innerHTML = "";
}
searchBox.addEventListener("input", ()=> 
{
    const countryItem = document.querySelector(".country-item");

    const target_element = event.currentTarget.value;
    
    const indexElement = target_element[0];
    
    if (target_element === "")
    {
        clearList();

        body.setAttribute("onload", Notiflix.Notify.failure('Oops! There is no country!'));

        //Too many maches found please ennter a specific name!
        console.log("\nOops! There is no country!");
    }
    else
    {
        fetchUsers().then((country) =>
        {
            setTimeout(() =>
            {
                renderCountryIndexList(country, indexElement);
              
            }, 1000);
          
            clearList();
      
            renderCountryList(country, target_element);

        }).catch((error) =>
        {
            console.log(error);
        });
    }
});