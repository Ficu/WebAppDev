export class App {
    opwApiKey = '4fb63daa3893eb6686fa6c5d34670466';    
    cities: string[] = [];

    constructor() {
        this.addListenersAndFindElements();
        this.getData();
    }

    private addListenersAndFindElements(): void {
        let weatherButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#weatherButton");
        let clearButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#clearButton');

        weatherButton.addEventListener('click', () => this.addWeather());     
        clearButton.addEventListener('click', () => this.clearData());
    }

    private clearData(): void {
        localStorage.clear();
        document.getElementById("weatherWrapper").innerHTML = "";
    }

    private async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        if(weatherResponse.status == 200) {
            return weatherData;
        } else {
            return null;
        }        
    }


    private saveData(data: string) {
        if(!this.cities.includes(data)) {
        this.cities.push(data);
        localStorage.setItem('cities', JSON.stringify(this.cities));
         }
    }

    private getData() {
        const data : string[] = [...JSON.parse(localStorage.getItem('cities'))];

        data.forEach(city => this.getWeather(city).then((data : any) =>{
                 this.newWeatherElem(data);
             })
        );
    }        



    private async addWeather() {
        const weatherInput = <HTMLInputElement>document.querySelector("#weatherInput");
        const weatherData =  await this.getWeather(weatherInput.value);
        if(weatherData != null && !this.cities.includes(weatherData.name)) {
            this.saveData(weatherData.name);
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
        elemLiWindspeed.innerText = "Wilgotność: " + data.main.humidity + "%";
        detailsList.appendChild(elemLiWindspeed);

        //wilgotnosc
        let elemLiHum = document.createElement("li");
        elemLiHum.innerText = "Predkosc wiatru: " + data.wind.speed + " m/s";
        detailsList.appendChild(elemLiHum);

        weatherDetails.appendChild(detailsList);
        weatherElem.appendChild(weatherDetails);
    };
    
}
