let formEl = document.querySelector("#form");
let textInput = document.querySelector("#location");
let detailsContainer = document.querySelector("#location-details");
let recentSearchesEl = document.querySelector("#recent-searches-list");
let recentSearchItem = document.querySelector("#recent-search-li");

async function handleSearch(e, shouldPushToLs = true) {
  e.preventDefault();
  if (textInput.value === "") {
    return;
  }

  //fetch data
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${textInput.value}&limit=5&appid=a1ae3427b7bdb878344cb4b25e0df8f9`;
    const response = await fetch(url);
    const result = await response.text();
    let locationData = JSON.parse(result);

    const lat = locationData[0].lat;
    const lon = locationData[0].lon;

    // get actual weather data
    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=a1ae3427b7bdb878344cb4b25e0df8f9`
    );
    const result2 = await response2.text();
    const locationData2 = JSON.parse(result2);
    console.log(locationData2);

    if (shouldPushToLs) {
      let recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
      if (recentSearches && recentSearches.length > 0) {
        recentSearches.push(textInput.value);
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      } else {
        let newSearches = [];
        newSearches.push(textInput.value);
        localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      }
    }
  } catch (e) {
    //error message
    window.alert("no location found. please check spelling");
    console.log(e);
  }
}

formEl.addEventListener("submit", handleSearch);
