// List Countries

import { fetchUsers } from "./fetchUsers.js";

const body = document.querySelector("body");

const searchBox = document.querySelector("#search-box");

const countryList = document.querySelector(".country-list");

const countryInfo = document.querySelector(".country-info");

const countryItem = document.querySelector(".country-item-list");

searchBox.style.marginLeft = '40px';

searchBox.style.marginTop = '30px';

const DEBOUNCE_DELAY = 300;

function renderCountryList(countries, index)
{
    const markup_list = countries.filter((country) => country.name.common[0] === index).map((country) =>
    {
        return "<br/>" +
               "<li class='country-item-list'>" +
                   "<article class='country-article'>" +
                       `<a class='country-link' href='${country.flags.png}'>` +
                           `<img class='country-image' src='${country.flags.svg}' width='50' height='30' title='{country.name.official}' alt='{country.name.official}'/>` +
                           "<span>" +
                               `<b class='country-title'>${country.name.common}</b>` +
                           "</span>" +
                       "</a>" +
                   "</article>" +
               "</li>";

    }).sort().join("");
    
    countryList.innerHTML = markup_list;
}
function renderCountryIndexList(countries, text)
{
    const markup = countries.filter((country) => country.name.common === text).map((country) =>
    {
        return "<br/>" +
               "<li class='country-item'>" +
                   "<article class='country-article'>" +                       
                       "<b class='country-flag'>Flag:</b>" +
                       `<a class='country-link' href='${country.flags.png}'>` +
                           `<img class='country-flag-image' src='${country.flags.svg}' width='200' height='100' title='{country.name.official}' alt='{country.name.official}'/>` +
                       "</a>" +
                   "</article>" +
                   "<br/>" +
                   "<p>" +
                       "<b class='country-label'>Name country:</b>" +
                       `<i class='country-name'>${country.name.official};</i>` +
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
    
    countryInfo.innerHTML = markup;
}
function renderCountryIndexAllList(countries, text)
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
    
    countryInfo.innerHTML = markup;
}
function clearList()
{
    countryList.innerHTML = "";

    countryInfo.innerHTML = "";
}
searchBox.addEventListener("input", ()=> 
{
    const target_index_element = searchBox.value.trim();
    
    const target_element = event.currentTarget.value;
    
    const index_element = target_element[0];
    
    fetchUsers().then((country) =>
    {
        setTimeout(() =>
        {
            if (target_index_element.length >= 1 && target_index_element.length <= 10)
            {
                countryInfo.innerHTML = "";

                renderCountryList(country, index_element);
            }
            else if (target_index_element.length > 10)
            {
                clearList();
                
                body.setAttribute("onload", Notiflix.Notify.warning('Too many maches found! Please enter are more specific name!'));

                alert("Too many maches found! Please enter are more specific name!");

                console.log("\nToo many maches found! Please enter are more specific name!");
            }
            else if (target_index_element.length === 0)
            {
                clearList();
                
                body.setAttribute("onload", Notiflix.Notify.failure('Oops, there is no country with that name!'));
                    
                alert("Oops, there is no country with that name!");

                console.log("\nOops, there is no country with that name!");
            }
            renderCountryIndexList(country, target_element);
        
        }, DEBOUNCE_DELAY);

    }).catch((error) =>
    {
        console.log(error);
    });
});