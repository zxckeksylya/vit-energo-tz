import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { from } from "rxjs";
import { Comment } from "../interfaces/comment.interface";

@Injectable({
    providedIn:'root',
})
export class CommentsService{
    private dbPath = '/comments';

    commentsRef: AngularFirestoreCollection<Comment>;

    constructor(private afs:AngularFirestore){
        this.commentsRef = afs.collection(this.dbPath);
    }

    public createComment(comment:Comment){
        return from(this.commentsRef.add({...comment}));
    }

    public updateComment(id:string,comment:Comment){
        return from(this.commentsRef.doc(id).update(comment));
    }

    public getCommentById(id:string){
        return this.commentsRef.doc(id).get();
    }

    public deleteComment(id:string){
        return from(this.commentsRef.doc(id).delete());
    }

    public getAll(){
        return this.commentsRef.snapshotChanges();
    }
}