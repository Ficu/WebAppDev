export class App {
    opwApiKey = '4fb63daa3893eb6686fa6c5d34670466';    

    constructor() {
        this.getCityInfo('zakopane')
        this.addListenersAndFindElements();
    }
    async getCityInfo(city: string) {
        const weather = await this.getWeather('zakopane');
        this.saveData(weather);
        console.log(localStorage.getItem('weaterData'));
    }
    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        if(weatherResponse.status == 200) {
            return weatherData;
        } else {
            return null;
        }        
    }
    saveData(data: any) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }
    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }

    private addListenersAndFindElements() {
        let weatherButton = document.querySelector("#weatherButton");
        let deleteButton = document.querySelector('.deleteElem');

        weatherButton.addEventListener('click', () => this.addWeather());       

    }

    async addWeather() {
        const weatherInput = <HTMLInputElement>document.querySelector("#weatherInput");
        const weatherData =  await this.getWeather(weatherInput.value);
        if(weatherData != null) {
            this.saveData(weatherData);
            this.newWeatherElem(weatherData);
        }
    }

    private newWeatherElem(data: any){

        //tworzymy i dodajemy podstawowy weather elem do wrappera
        const weatherWrapper = document.querySelector("#weatherWrapper");
        const weatherElem = document.createElement("div");
        weatherElem.className = "weatherElem";
        weatherWrapper.appendChild(weatherElem);

        //delete elem
        const deleteElem = document.createElement("button");
        deleteElem.className = "deleteElem";
        deleteElem.innerText = "X";
        weatherElem.appendChild(deleteElem);

        //cityname
        const cityName = document.createElement("div");
        cityName.className = "cityName";
        const cityNameh3 = document.createElement("h3");
        cityNameh3.textContent = data.name;
        cityName.appendChild(cityNameh3);
        weatherElem.appendChild(cityName);

        //weatherDetails
        const weatherDetails = document.createElement("div");
        weatherDetails.className = "weatherDetails";
        const detailsList = document.createElement("ul");
        //temp min
        let elemLiTempMax = document.createElement("li");
        elemLiTempMax.innerText = "Temperatura maksymalna: " + data.main.temp_max + "°C";
        detailsList.appendChild(elemLiTempMax);
        
        //temp max
        let elemLiTempMin = document.createElement("li");
        elemLiTempMin.innerText = "Temperatura minimalna: " + data.main.temp_min + "°C";
        detailsList.appendChild(elemLiTempMin);

        //predkosc wiatru
        let elemLiWindspeed = document.createElement("li");
        elemLiWindspeed.innerText = "Predkosc wiatru: " + data.main.humidity + "%";
        detailsList.appendChild(elemLiWindspeed);

        //wilgotnosc
        let elemLiHum = document.createElement("li");
        elemLiHum.innerText = "Predkosc wiatru: " + data.wind.speed + " m/s";
        detailsList.appendChild(elemLiHum);

        weatherDetails.appendChild(detailsList);
        weatherElem.appendChild(weatherDetails);
    };
    
}