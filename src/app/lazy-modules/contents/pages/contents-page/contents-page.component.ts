import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TablePostItem } from 'src/app/shared/interfaces/post.interface';
import { AppState } from 'src/app/store/app.reducers';
import { select, Store } from '@ngrx/store';
import { getPostsByCategoriesIdSelector } from '../../../../store/posts/posts.selects';
import {
  getCategoriesSelector,
  getCategoriesByIdsSelector,
} from '../../../../store/categories/category.selectors';
import { takeUntil, Subject, switchMap, concatMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss'],
})
export class ContentsPageComponent implements OnInit {
  public formControl = new FormControl();

  public posts: TablePostItem[] = [];

  public categories: any;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {

    this.store
    .pipe(select(getCategoriesSelector), takeUntil(this.destroy$))
    .subscribe((data) => {
      this.categories = data.map((x) => ({ label: x.name, value: x.id }));
    });

    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params=>
      this.formControl.setValue(params['categories'].split(','),{emitEvent:false})
    )
    this.activatedRoute.queryParams
      .pipe(
        concatMap((params) =>
        {
          console.log(params)
          console.log(params['categories'])
          return this.store.pipe(
          select((state) =>
            getCategoriesByIdsSelector(state, params['categories'].split(','))
          )
        )}
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((params) => {
        console.log(params);
      });

    this.formControl.valueChanges
      .pipe
      // switchMap((value) =>
      //   this.store.pipe(
      //     select((state) => {
      //       console.log(value);

      //       return getPostsByCategoriesIdSelector(state, {
      //         categoriesId: value,
      //       });
      //     })
      //   )
      // )
      ()
      .subscribe((posts) => {
        console.log(posts);
        // this.posts = posts;
        this.route.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { categories: posts.toString() },
          queryParamsHandling:'merge'
        });
      });


  }
}
