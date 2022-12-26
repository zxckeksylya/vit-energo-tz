import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, Observable, concatMap, concatMapTo, exhaustMap, take } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ImagesService{
    constructor(private afs:AngularFireStorage){}

    public upload(event:any){
        const randomId = Math.random().toString(36).substring(2);
        const imagePath = '/images/'+randomId;
        const ref = this.afs.ref('/images/'+randomId);

        const task = ref.put(event.target.files[0]);
        let downloadURL: Observable<string>;
        task.snapshotChanges().pipe(
            exhaustMap(()=>ref.getDownloadURL() 
                
            )
        ).subscribe();
        return imagePath;


    }

    public getImageLink(link:string){
        console.log('ttt')
        return this.afs.ref(link).getDownloadURL()
    }
}