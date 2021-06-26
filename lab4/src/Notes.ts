import { IStorage } from "./Interfaces/IStorage";
import { AppStorage } from "./appStorage";
import { Note } from "./Note";

export class Notes {

    async generateNotesFromStorage() {
        const appStorage = new AppStorage();
        const note = new Note();
        const data = await appStorage.getData();

        data.map((item: IStorage) => {
            note.createNote(item);
        });
    }

    public addListeners(): void {
        const noteAddModal: HTMLDialogElement = <HTMLDialogElement>document.getElementById("addNoteModal");
        const addNoteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addNoteButton");
        const closeAddNoteButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#closeAddNote");
        const clearButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#clearButton");
        const sendNote: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#buttonSaveNote");
    
        clearButton.addEventListener('click', this.clearData);

        addNoteButton.addEventListener('click', () => {
            noteAddModal.showModal();
        });
        closeAddNoteButton.addEventListener('click', () => {
            noteAddModal.close();
        });
        sendNote.addEventListener('click', this.addNote);
    }

    private async addNote() {
        const newNote = new Note();
        const noteData: IStorage = await newNote.getFormData();

        const storage = new AppStorage();

        if(noteData) {
            storage.saveData(noteData);
            newNote.createNote(noteData);
        }

    }

    private clearData(): void {
        localStorage.clear();
        document.getElementById("noteWrapper").innerHTML = "";
    } 
}