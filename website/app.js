const MY_API_KEY ='6920e46280e8034513729b7e526c2ca2';
const zipCodeEnteredByCustomerElement = document.getElementById('zip');
let zipCodeEnteredByCustomer = zipCodeEnteredByCustomerElement.value;
const initialUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const feelingsElement = document.getElementById('feelings');
const feelingsEnteredByCustomer = feelingsElement.value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// OnClicking the Generate button, add a function
document.getElementById('generate').addEventListener('click', async () => {
    if (!zipCodeEnteredByCustomerElement.value || !feelingsElement.value) {
        alert('Please fill out the zip-code and feelings fields');
        return;
    }
    const weatherData= await getWeatherTemp(initialUrl, zipCodeEnteredByCustomer, MY_API_KEY);
    await sendDataToServer ({
        date: newDate,
        temp: weatherData.main.temp,
        feelings: feelingsEnteredByCustomer,
        city : weatherData.name,
        country: weatherData.sys.country,
        //weatherDescription: weatherData.weather[0].description
        });
    await uiUpdate();

});

//get weather temp
let getWeatherTemp = async (initialUrl, zipCodeEnteredByCustomer, MY_API_KEY) => {
    const request = await fetch(`${initialUrl}${zipCodeEnteredByCustomerElement.value}&appid=${MY_API_KEY}&units=imperial`);
try {
    const response = await request.json();
    return  response;
} catch (err) {
    console.log(err.message);
}}

// send data to the server
let sendDataToServer = async (data = {}) => {
    const request = await fetch('/sendData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })

try {   
    const response = await request.json();
    return response;
} catch (err) {
    console.log(err.message);
}}

// update UI
let uiUpdate = async () => {
    const request = await fetch('/getData')

try {
    const response = await request.json();
    document.getElementById('date').innerHTML = `today is ${response.date}`
    document.getElementById('temp').innerHTML = `temp is ${response.temp}`
    document.getElementById('content').innerHTML = `I feel ${feelingsElement.value}`
    document.getElementById('city').innerHTML = `You are located in ${response.city}, ${response.country}`
    //document.getElementById('weather').innerHTML = `The weather is ${weatherDescription}`
} catch (err) {
    console.log(err.message);
}};

//JSON.parse(weatherData); to convert data from string to an object to be able to put weather description