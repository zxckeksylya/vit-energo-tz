import { Component, Input, OnInit } from '@angular/core';
import { TablePostItem } from '../../../../shared/interfaces/post.interface';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AppState } from '../../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { getLikeStatusByPostId } from 'src/app/store/posts/posts.selects';
import { changeLikePost } from '../../../../store/posts/posts.actions';
import { createCategoryAction } from '../../../../store/categories/category.actions';
import { createCommentAction } from '../../../../store/comments/comments.action';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post!:TablePostItem;

  public likeControl = new FormControl();

  public commentForm!:FormGroup;

  constructor(private store:Store<AppState>,private fb:FormBuilder){}

  public ngOnInit(): void {
    this.store.pipe(select((state)=>getLikeStatusByPostId(state,this.post.id))).subscribe(p=>this.likeControl.patchValue(p,{emitEvent:false}))

    this.likeControl.valueChanges.pipe().subscribe(v=>{
      this.store.dispatch(changeLikePost({id:this.post.id}))})
    this.initCommentForm();
  }

  public initCommentForm():void{
    this.commentForm = this.fb.group({
      content:''
    })
  }

  public onSubmitForm():void{
    if(this.commentForm.invalid){
      return;
    }
    this.store.dispatch(createCommentAction({postId:this.post.id,comment:this.commentForm.getRawValue()}))
    console.log(this.commentForm.getRawValue())
  }
}
