import { IStorage } from "./interfaces/IStorage";

export class AppStorage{
    notes: IStorage[] = [];
    
    saveData(data: IStorage) {
        const dataFromStorage = localStorage.getItem('notes');
        if(dataFromStorage != null){
            const actuallData = JSON.parse(dataFromStorage);

            actuallData.map((x:any) => {
                this.notes.push(x);
            });

            if(data.title != ""){
                this.notes.push(data);
                localStorage.setItem("notes", JSON.stringify(this.notes));
            }

        } else {
            this.notes.push(data);
            localStorage.setItem("notes", JSON.stringify(this.notes));
        }
    }

    replaceData(data: any) {
        localStorage.setItem("notes", JSON.stringify(data));
    }

    async getData() {
        const storageData = localStorage.getItem('notes');
        return JSON.parse(storageData);
    }
    
}