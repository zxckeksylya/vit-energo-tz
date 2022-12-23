import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Category } from '../interfaces/category.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private dbPath = '/categories';

  categoriesRef: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.categoriesRef = afs.collection(this.dbPath);
  }

  public createCategory(category: Category) {
    return from(this.categoriesRef.add({ ...category }));
  }

  public updateCategory(id: string, category: Category) {
    return from(this.categoriesRef.doc(id).update(category));
  }

  public getCategoryById(id: string) {
    return this.categoriesRef.doc(id).get();
  }

  public deleteCategory(id: string) {
    return from(this.categoriesRef.doc(id).delete());
  }

  public getAll() {
    return this.categoriesRef.snapshotChanges();
  }
}
