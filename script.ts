class StatApp {
    containerDOMElement: Element;
    constructor(containerDOMElement: Element) {
        if(!containerDOMElement) {
            throw new Error("Musisz podać element");
        }
        this.containerDOMElement = containerDOMElement;
        this.startApp();
    }
    getInputs(): void {
        let elements = this.containerDOMElement.getElementsByTagName("input");
        let numberArray: Array<number>;
        for(let i = 0;i < elements.length; i++)
        {
            //let value: number = parseFloat(elements[i].value);
            let value: number = +elements[i].value;
            value.toString();
            numberArray += ;
        }
    }

    startApp(): void {

    }
}

class Statistic {

    constructor(inputArray: Array<number>) {

    }
}

const statApp = new StatApp(document.querySelector("#startApp"));


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