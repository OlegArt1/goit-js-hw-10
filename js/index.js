//import './css/styles.css';

import { fetchUsers } from "./fetchUsers.js";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");

const countryList = document.querySelector(".country-list");

const countryInfo = document.querySelector(".countrt-info");

searchBox.style.marginLeft = '20px';

searchBox.style.marginTop = '20px';

function renderCountryIndexList(countries, index)
{
    const markup = countries.filter((country) => country.name.common[0] === index).map((country) =>
   {
       return "<br/>" +
             "<li class='country-item' style='list-style-type: none;'>" +
               "<div style ='display: flex; align-items: center;'>" +
                 `<a class='country-link' href='${country.flags.png}'>` +
                   `<img class='country-image' src='${country.flags.svg}' width='50' height='30' title='{country.name.official}' alt='{country.name.official}'/>` +
                 "</a>" +
                 "<span style='margin-left: 10px;'>" +
                 `<b>${country.name.common}</b></span>` +              
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
               "<li class='country-item' style='list-style-type: none;'>" +
                 "<div style='display: flex; align-items: center;'>" +                       
                  "<b style='margin-right: 5px;'>Flag:</b>" +
                   `<a class='country-link' href='${country.flags.png}'>` +
                     `<img class='country-image' src='${country.flags.svg}' width='200' height='100' title='{country.name.official}' alt='{country.name.official}'/>` +
                 "</a>" +
               "</div>" +
               "<br/>" +
               "<p>" +
                 "<b>Name country:&nbsp;&nbsp;</b>" +
                 `<i class='country-name'>${country.name.official};</i>` +
              "</p>" +
              "<p>" +
                "<b>Area:&nbsp;&nbsp;</b>" +
                `<i class='country-area'>${country.area} m<sup>2</sup>;</i>` +
              "</p>" +
              "<p>" +
                "<b>Continent:&nbsp;&nbsp;</b>" +
                `<i class='country-region'>${country.continents};</i>` +
              "</p>" +
              "<p>" +
                "<b>Subcontinent:&nbsp;&nbsp;</b>" +
                `<i class='country-subregion'>${country.subregion};</i>` +
              "</p>" +
              "<p>" +
                "<b>Population:&nbsp;&nbsp;</b>" +
                `<i class='country-population'>${country.population} people;</i>` +
              "</p>" +
              "<p>" +
                "<b>Capital:&nbsp;&nbsp;</b>" +
                `<i class='country-capital'>${country.capital};</i>` +
              "</p>" +
              "<p>" +
                "<b>Languages:&nbsp;&nbsp;</b>" +
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
    const target_element = event.currentTarget.value;
    
    const indexElement = target_element[0];
    
    const indexName = document.querySelector("b.country-name");
    
    fetchUsers().then((country) =>
    {
        if (countryInfo !== "")
        {
            setTimeout(() =>
            {
                renderCountryIndexList(country, indexElement);
            
            }, 1000);
        
            clearList();
        
            renderCountryList(country, target_element);
       }
       else
       {
           countryInfo.textContent = "Error!";
       }
    }).catch((error) => console.log(error));
});