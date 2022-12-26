import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { Like } from '../interfaces/like.interface';

@Injectable({
   providedIn:'root'
})
export class LikeService{
    private dbPath = '/likes';

    likesRef: AngularFirestoreCollection<Like>;

    constructor(private afs:AngularFirestore){
        this.likesRef = afs.collection(this.dbPath);
    }

    public createLike(like:Like){
        return from(this.likesRef.add({...like}));
    }

    public updateLike(id:string,like:Like){
        return from(this.likesRef.doc(id).update(like));
    }

    public getLikeById(id:string){
        return this.likesRef.doc(id).get();
    }

    public deleteLike(id:string){
        return from(this.likesRef.doc(id).delete());
    }

    public getAll(){
        return this.likesRef.snapshotChanges();
    }
}