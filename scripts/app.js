const cityForm = document.querySelector("form");

const card = document.querySelector(".card");

const details = document.querySelector(".details");

const time = document.querySelector("img.time");

const icon = document.querySelector(".icon img");

const updateUI = (data) => {

    const {cityDetails, weatherDetails} = data

    // const cityDetails = data.cityDetails;

    // const weatherDetails = data.weatherDetails;

    // update details template

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    
    `
    // update the night/day and icon images

  const iconSrc = `icons/${weatherDetails.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);

  // ternary operator

//   const result = condition ? value1: value2;

  let timeSrc = weatherDetails.IsDayTime ? "img/day.svg" : "img/night.svg";

//   if (weatherDetails.IsDayTime) {
    
//     timeSrc = "img/day.svg";

//   }else {
//       timeSrc = "img/night.svg";
//   }

  time.setAttribute('src', timeSrc);






    // remove d-none if present
    if(card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }

}


const updateCity = async (city) => {

    const cityDetails = await getCity(city);

    const weatherDetails = await getWeather(cityDetails.Key);

    return {cityDetails,weatherDetails};

};

cityForm.addEventListener("submit", e =>{
// preventdefault action
e.preventDefault();

// get city value

const city = cityForm.city.value.trim();

cityForm.reset();


// update ui with new city value

updateCity(city)
   .then (data => updateUI(data))
   .catch (err => console.log(err));

});