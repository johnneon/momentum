// Get all items
const time = document.querySelector('#time'),
    dayToday = document.querySelector('#date'),
    greeting = document.querySelector('#greeting'),
    quote = document.querySelector('#quote'),
    icon = document.querySelector('#icon'),
    degrees = document.querySelector('#degrees'),
    humidity = document.querySelector('#humidity'),
    wind = document.querySelector('#wind'),
    city = document.querySelector('#city'),
    name = document.querySelector('#name'),
    focusInput = document.querySelector('#focus'),
    backgrounds = document.querySelector('#backgrounds'),
    wrapper = document.querySelector('#wrapper'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    newQuote = document.querySelector('#newQuote'),
    allBackgrounds = [
        './assets/images/night/00.jpg',
        './assets/images/night/01.jpg',
        './assets/images/night/02.jpg',
        './assets/images/night/03.jpg',
        './assets/images/night/04.jpg',
        './assets/images/night/05.jpg',
        './assets/images/morning/06.jpg',
        './assets/images/morning/07.jpg',
        './assets/images/morning/08.jpg',
        './assets/images/morning/09.jpg',
        './assets/images/morning/10.jpg',
        './assets/images/morning/11.jpg',
        './assets/images/day/12.jpg',
        './assets/images/day/13.jpg',
        './assets/images/day/14.jpg',
        './assets/images/day/15.jpg',
        './assets/images/day/16.jpg',
        './assets/images/day/17.jpg',
        './assets/images/evening/18.jpg',
        './assets/images/evening/19.jpg',
        './assets/images/evening/20.jpg',
        './assets/images/evening/21.jpg',
        './assets/images/evening/22.jpg',
        './assets/images/evening/23.jpg',
    ];

// Show real time
const showTime = () => {
    let today = new Date(),
        hour = addZero(today.getHours()),
        min = addZero(today.getMinutes()),
        sec = addZero(today.getSeconds());

    // Display time
    time.innerHTML = `<span>${hour}</span>:<span>${min}</span>:<span>${sec}</span>`
    setTimeout(showTime, 1000);
}

// Show day/month
const showDate = () => {
    let today = new Date(),
        date = addZero(today.getDate()),
        day = dayName(today.getDay()),
        month = monthName(today.getMonth());

    // Display date
    dayToday.innerText = `${day}, ${date} ${month}`;
}

// Check day
const dayName = (n) => {
    let name = '';
    switch(n) {
        case 0:
            name = 'Sunday';
            break;
        case 1:
            name = 'Monday';
            break;
        case 2:
            name = 'Tuesday';
            break;
        case 3:
            name = 'Wednesday';
            break;
        case 4:
            name = 'Thursday';
            break;
        case 5:
            name = 'Friday';
            break;
        case 6:
            name = 'Saturday';
            break;
    }
    return name;
};

// Check month
const monthName = (n) => {
    let name = '';
    switch(n) {
        case 0:
            name = 'January';
            break;
        case 1:
            name = 'February';
            break;
        case 2:
            name = 'March';
            break;
        case 3:
            name = 'April';
            break;
        case 4:
            name = 'May';
            break;
        case 5:
            name = 'June';
            break;
        case 6:
            name = 'July';
            break;
        case 7:
            name = 'August';
            break;
        case 8:
            name = 'September';
            break;
        case 9:
            name = 'October';
            break;
        case 10:
            name = 'November';
            break;
        case 11:
            name = 'December';
            break;
    }
    return name;
};

// Adding 0 for less 10 num
const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Make new image for animation
const makeImage = () => {
    const image = document.createElement('img');
    return image;
}

// Chenge text for time
const changeText = () => {
    let today = new Date(),
        hour = today.getHours();
    if (hour <= 6 && hour >= 0) {
        greeting.innerText = 'Good Night'
    } else if (hour <= 12 && hour > 6) {
        greeting.innerText = 'Good Morning'
    } else if (hour <= 18 && hour > 12) {
        greeting.innerText = 'Good Afternoon'
    } else if (hour <= 23 && hour > 18) {
        greeting.innerText = 'Good Evening'
    }
}

// Set Background and Greeting
const setBgGreet = () => {
    let today = new Date(),
        hour = today.getHours(),
        isEnable = true; // For correct slide

    // For first image
    const firstImage = makeImage();
    firstImage.src = allBackgrounds[hour];
    backgrounds.prepend(firstImage);

    // For checking all backgrounds!)
    arrowRight.addEventListener('click', () => {
        if(isEnable) {
            if(hour == 23) hour = -1;
            hour++;

            const prevImage = backgrounds.children[backgrounds.children.length - 1],
                newImage = makeImage();

            newImage.src = allBackgrounds[hour];
            backgrounds.prepend(newImage);
            prevImage.style.opacity = `${0}`;
            prevImage.addEventListener('transitionend', () => {
                backgrounds.prepend(newImage); // Add new one
                prevImage.remove(); // Remove previos
                isEnable = true;
            });

            isEnable = false;
        }
    });
}

// Set name to localStorage
const setName = (e)=> {
    if (e.type = 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            name.blur();
        }
        localStorage.setItem('name', e.target.innerText);
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
    // Check for empty input
    if(name.innerText == '' && e.type == 'blur') {
        localStorage.setItem('name', localStorage.getItem('prevname'));
        name.innerText = localStorage.name;
    }
}

// Clear on focus
const clearName = (e) => {
    localStorage.setItem('prevname', e.target.innerText);
    name.innerText = '';
}

// Get on load
const getName = () => {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.innerText = localStorage.name;
    }
}

// Set focus to localStorage
const setFocus = (e)=> {
    if (e.type = 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            focusInput.blur();
        }
        localStorage.setItem('focus', e.target.innerText);
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
    // Check for empty input
    if(focusInput.innerText == '' && e.type == 'blur') {
        localStorage.setItem('focus', localStorage.getItem('prevfocus'));
        focusInput.innerText = localStorage.focus;
    }
}

// Get on load
const getFocus = () => {
    if (localStorage.getItem('focus') === null) {
        focusInput.textContent = '[Enter Focus]';
    } else {
        focusInput.innerText = localStorage.focus;
    }
}

// Clear on focus
const clearFocus = (e) => {
    localStorage.setItem('prevfocus', e.target.innerText);
    focusInput.innerText = '';
}

// Get new quote with API
const getQuote = async () => {
    const url = 'https://favqs.com/api/qotd';
    const response = await fetch(url);
    let data;
    if (response.ok) {
        data = await response.json();
      } else {
        alert('Упс(\nНеполадочки, извините, мы над этим работаем!)');
      }
    quote.innerText = '';
    quote.innerHTML = data.quote.body;
}

// Get weather with API
const getWeather = async () => {
    const apiKey = 'eb7290df8210ec1e343811c44b869b32';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity()}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.cod == 404 || data.cod == 400) {
        degrees.innerText = `Sorry can't find the city`;
        degrees.style.color = '#ff0000'
    } else {
        degrees.style.color = '#ffffff'
    }
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    degrees.innerText = `${data.main.temp}°`
    wind.innerText = `Wind speed: ${data.wind.speed} meter/sec`
    humidity.innerText = `Air humidity: ${data.main.humidity}%`
}

// Set new city for weather
const setCity = (e)=> {
    if (e.type = 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            city.blur();
            getWeather();
        }
        localStorage.setItem('city', e.target.innerText);
    } else {
        localStorage.setItem('city', e.target.innerText);
    }
    if(city.innerText == '' && e.type == 'blur') {
        localStorage.setItem('city', localStorage.getItem('prevcity'));
        city.innerText = localStorage.city;
    }
    if(e.type == 'blur') {
        getWeather();
    }
}

// Get on load
const getCity = () => {
    if (localStorage.getItem('city') === null) {
        city.textContent = 'London';
        return 'London';
    } else {
        city.innerText = localStorage.city;
        return localStorage.city;
    }
}

// Clear on focus
const clearCity = (e) => {
    localStorage.setItem('prevcity', e.target.innerText);
    city.innerText = '';
}

// Run
city.addEventListener('click', clearCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
name.addEventListener('click', clearName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusInput.addEventListener('click', clearFocus);
focusInput.addEventListener('keypress', setFocus);
focusInput.addEventListener('blur', setFocus);
newQuote.addEventListener('click', getQuote)

showTime();
showDate();
changeText();
setBgGreet();
getName();
getFocus();
getCity();
getQuote();
getWeather();
