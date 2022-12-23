import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private dbPath = '/posts';

  postsRef: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.postsRef = afs.collection(this.dbPath);
  }

  public createPost(post: Post) {
    return from(this.postsRef.add({ ...post }));
  }

  public updatePost(id: string, post: Post) {
    return from(this.postsRef.doc(id).update(post));
  }

  public getPostById(id: string) {
    return this.postsRef.doc(id).get();
  }

  public deletePost(id: string) {
    return from(this.postsRef.doc(id).delete());
  }

  public getAll() {
    return this.postsRef.snapshotChanges();
  }
}
