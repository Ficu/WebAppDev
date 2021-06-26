import { IStorage } from "./Interfaces/IStorage";
import { AppStorage } from "./appStorage";

export class Note {

    async getFormData(): Promise<IStorage> {

        const noteTitle: HTMLInputElement = <HTMLInputElement>document.querySelector("#noteTitle");
        const noteContent: HTMLInputElement = <HTMLInputElement>document.querySelector("#noteContent");
        const noteColor: HTMLInputElement = <HTMLInputElement>document.querySelector('input[name="colorChooser"]:checked');
        const noteAddModal: HTMLDialogElement = <HTMLDialogElement>document.getElementById("addNoteModal");
        
        const storageApp = new AppStorage();
        const storageAppData = await storageApp.getData();
        let noteId = 0;
        if(storageAppData != null && storageAppData.length > 0){
            storageAppData.map((item: IStorage) => {
                if(noteId<=item.id){
                    noteId = item.id;
                }
            });
        } else
            noteId = 0;
        
        noteId += 1;
        
        const data: IStorage = {
            id: noteId,
            title: noteTitle.value,
            content: noteContent.value,
            color: noteColor.value,
            date: new Date().toDateString(),
            pinned: false
        };
        
        if(data.title != "" && data.content != "" && data.color != "") {
            
            noteTitle.value = "";
            noteContent.value = "";
            noteColor.checked = false;
            noteAddModal.close();
            
            return data;
        }
    }

    async deleteNote(noteid: number) {

        const storageApp = new AppStorage();
        console.log(noteid);
        const dataFromLocalStorage = await storageApp.getData();
        const z = dataFromLocalStorage.find((el: any) => el.id == noteid);
        const y = dataFromLocalStorage.indexOf(z);
        dataFromLocalStorage.splice(y, 1);

        storageApp.replaceData(dataFromLocalStorage);
        
        document.querySelector(`[data-noteid="${noteid}"]`).remove();

    }

    createNote(data: IStorage) {
        const wrapper = document.querySelector("#noteWrapper");

        const newElem = document.createElement("div");
        newElem.className = `noteElem ${data.color}`;
        newElem.id = data.id.toString();
        newElem.dataset.noteid = data.id.toString();
        const deleteButton = document.createElement("button")
        deleteButton.className = "deleteElem";
        
        deleteButton.dataset.noteid = data.id.toString();
        deleteButton.addEventListener("click", async (e) =>{
            console.log((e.target as Element).parentElement.dataset.noteid);
            const noteid = parseInt(((e.target as Element).parentElement.dataset.noteid));
            console.log("NUMER ID USUWANEGO EL: " + noteid);
            this.deleteNote(noteid);
            
        })
        deleteButton.innerText = "X";
        newElem.innerHTML = `
          <div class="noteTitle">
            <h3>${data.title}</h3>
          </div>
          <div class="noteContent">
            <p>
            ${data.content}  
            </p>
          </div>
        `;
        newElem.insertBefore(deleteButton, newElem.firstChild);

        wrapper.appendChild(newElem);
    }
}