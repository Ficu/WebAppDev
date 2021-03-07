var StatApp = /** @class */ (function () {
    function StatApp(containerDOMElement) {
        if (!containerDOMElement) {
            throw new Error("Musisz podać element");
        }
        this.containerDOMElement = containerDOMElement;
        this.startApp();
    }
    StatApp.prototype.startApp = function () {
        this.assignListener();
    };
    StatApp.prototype.getInputsAndValues = function () {
        var elements = this.containerDOMElement.querySelectorAll("input");
        if (!elements) {
            throw new Error("Brak inutów");
        }
        var numberArray = [];
        for (var i = 0; i < elements.length; i++) {
            var value = +elements[i].value;
            numberArray.push(value);
        }
        return numberArray;
    };
    StatApp.prototype.refreshData = function () {
        var numbers = this.getInputsAndValues();
        var sum = this.sumFunction(numbers);
        var avg = this.avgFunction(numbers);
        var max = Math.max.apply(Math, numbers);
        var min = Math.min.apply(Math, numbers);
        this.assignData(sum, avg, max, min);
    };
    StatApp.prototype.assignData = function (sum, avg, max, min) {
        document.getElementById("sum").textContent = sum.toString();
        document.getElementById("avg").textContent = avg.toString();
        document.getElementById("min").textContent = min.toString();
        document.getElementById("max").textContent = max.toString();
    };
    StatApp.prototype.sumFunction = function (numbersArray) {
        var sum = 0;
        numbersArray.forEach(function (element) {
            sum += element;
        });
        return sum;
    };
    StatApp.prototype.avgFunction = function (numbersArray) {
        return this.sumFunction(numbersArray) / numbersArray.length;
    };
    StatApp.prototype.assignListener = function () {
        var _this = this;
        var elements = this.containerDOMElement.querySelectorAll("input");
        for (var i = 0; i < elements.length; i++)
            elements[i].addEventListener("input", function () { return _this.refreshData(); });
    };
    return StatApp;
}());
var statApp = new StatApp(document.querySelector("#startApp"));
/*
MIN
1. Utwórz w html-a ze statycznymi 4 inputami tekstowymi lub typu number
2. Poniżej inputów wyświetl ich sumę, średnią, min, max - wartości powinny się aktualizować po każdej zmianie (możesz skorzystać ze zdarzenia input lub change na polu input)
NEXT
3. Zmień aplikację na inputy generowane dynamicznie. Liczba generowanych inputów jest pobierana z dodatkowego pola input
4. Wyświetlaj ikonkę oczekiwania zamiast wyników jeśli aktualnie wprowadzana wartość jest nieprawidłowa (lub aktualizuj po wyjściu z pola tekstowego)
5. Dodaj możliwość dynamicznego usuwania wybranych pól tekstowych (jednego lub wielu na raz)
6. Jeśli nie używałeś/aś klas - przerób kod na obiektowy.
*/ 
