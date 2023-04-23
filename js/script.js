// API URL
const url = 'https://restcountries.com/v2/all';

// Search Bar
const searchInput = document.getElementById('search-country');
searchInput.addEventListener('input', searchCountries);

// Country Cards
const countryData = document.getElementById('country-data');

// More Details Modal
const moreDetailsModal = document.getElementById('more-details-modal');
const modalTitle = document.getElementById('more-details-modal-label');
const flagImg = document.getElementById('flag');
const capital = document.getElementById('capital');
const population = document.getElementById('population');
const region = document.getElementById('region');
const subregion = document.getElementById('subregion');
const timezones = document.getElementById('timezones');
const currencies = document.getElementById('currencies');
const languages = document.getElementById('languages');

// Fetch Countries Data
fetch(url)
    .then(res => res.json())
    .then(data => {
        displayCountries(data);
    })
    .catch(err => console.log(err));

// Display Countries
function displayCountries(data) {
    const countryCards = data.map(country => `
        <div class="col-md-4 my-3">
            <div class="card">
                <img src="${country.flag}" class="card-img-top" alt="${country.name} flag">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text">${country.capital}</p>
                    <button  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more-details-modal" onclick="getCountryDetails('${country.alpha3Code}')"S>
                    More Details </button>
                </div>
            </div>
        </div>
    `).join('');

    countryData.innerHTML = countryCards;
}

// Get Country Details
function getCountryDetails(alpha3Code) {
    console.log(alpha3Code);
    fetch(`https://restcountries.com/v2/alpha/${alpha3Code}`)
        .then(res => res.json())
        .then(data => {
            modalTitle.innerHTML = data.name;
            flagImg.src = data.flag;
            capital.innerHTML = data.capital;
            population.innerHTML = data.population;
            region.innerHTML = data.region;
            subregion.innerHTML = data.subregion;
            timezones.innerHTML = data.timezones;
            currencies.innerHTML = data.currencies.map(currency => currency.name).join(', ');
            languages.innerHTML = data.languages.map(language => language.name).join(', ');
        })
        .catch(err => console.log(err));
}

// Search Countries
function searchCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const filteredCountries = data.filter(country => country.name.toLowerCase().includes(searchTerm));
            displayCountries(filteredCountries);
        })
        .catch(err => console.log(err));
}
