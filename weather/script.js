// variables
const key = '32230c2e989a69f56f5c65ce95c9ae84'
const container = document.querySelector('.container')
const button = document.querySelector('button')
const input = document.querySelector('input')


// functions
const geolocation = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`

const weather = async (lat, lon, city, state, country) => {
    const climate = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    const finalclimate = await climate.json()
    // console.log(finalclimate)
    const temp = ((finalclimate.main.temp) - 273.15).toFixed(0)
    const mintemp = ((finalclimate.main.temp_min) - 273.15).toFixed(0)
    const maxtemp = ((finalclimate.main.temp_max) - 273.15).toFixed(0)
    const weather = finalclimate.weather[0].main
    const descrip = finalclimate.weather[0].description
    const windspeed = ((0.5144444 * (finalclimate.wind.speed)) * 3.6).toFixed(0)
    const humidity = finalclimate.main.humidity
    const visibility = finalclimate.visibility / 1000
    const div = document.createElement('div')
    div.innerHTML = generatecard(city, state, country, temp, mintemp, maxtemp, weather, descrip, windspeed, humidity, visibility)
    container.appendChild(div)

}

const generatecard = (city, state, country, temp, mintemp, maxtemp, weather, descrip, windspeed, humidity, visibility) =>
    `<div class="card m-2 bg-purple-500 opacity-50 w-76 flex flex-col items-center p-2">
            <div class="city text-white italic font-serif text-3xl">${city}</div>
            <div class="text-lg text-white italic font-serif mt-1">${state} ${country}</div>
            <div class="temp text-white font-serif italic mt-8 text-2xl">
                <span class="val text-2xl">${temp}</span>
                C
            </div>
            <div class="mm text-white italic flex">
                <div class="mintemp  mx-6">
                    Min:
                    <span class="min">${mintemp}</span>
                    C
                </div>
                <div class="maxtemp  mx-6">
                    Max:
                    <span class="max">${maxtemp}</span>
                    C
                </div>
            </div>
            <div class="Weather text-4xl text-white italic mt-6">
                <div class="main text-3xl flex justify-center">${weather}</div>
                <div class="description flex justify-center text-2xl">${descrip}</div>
            </div>
            <div class="details text-white text-xl italic mt-8 ">
                <div class="wind">🍃Wind-speed:
                    <span class="ws">${windspeed}kmph</span>
                </div>
                <div class="humidity">💦Humidity:
                    <span class="humi">${humidity}</span>
                </div>
                <div class="visibility">👀Visibility:
                    <span class="visi">${visibility}km</span>
                </div>
            </div>
        </div>`

const geoloc = async (city) => {
    input.value = ''
    const loc = await fetch(geolocation(city))
    const finalloc = await loc.json()
    container.innerHTML = ''
    // console.log(finalloc)
    finalloc.forEach(element => {
        const lat = element.lat
        const lon = element.lon
        const name = element.name
        const state = element.state
        const country = element.country
        weather(lat, lon, name, state, country)
    });
}


// main
button.addEventListener('click', () => {
    console.log(input.value)
    geoloc(input.value)
})
navigator.geolocation.getCurrentPosition(pos => {
    container.innerHTML = ''
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    //   console.log(lat)  
    //   console.log(lon)
    weather(lat, lon, 'current location', '-', '-')
})


