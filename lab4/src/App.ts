import { AppStorage } from "./appStorage";
import { IStorage } from "./Interfaces/IStorage";
import { Note } from "./Note";
import { Notes } from "./Notes";

export class App {
    constructor() {

        const notes = new Notes();
        notes.generateNotesFromStorage();
        notes.addListeners();

    }
}
