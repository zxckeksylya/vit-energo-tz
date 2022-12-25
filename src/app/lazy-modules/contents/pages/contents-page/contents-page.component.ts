import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TablePostItem } from 'src/app/shared/interfaces/post.interface';
import { AppState } from 'src/app/store/app.reducers';
import { getCategoriesSelector } from '../../../../store/categories/category.selectors';
import { getPostsByCategoriesIdSelector } from '../../../../store/posts/posts.selects';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss'],
})
export class ContentsPageComponent implements OnInit,OnDestroy {
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

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['categories']) {
          this.formControl.setValue(params['categories'].split(','), {
            emitEvent: false,
          });
        }
      });

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) =>
          this.store.pipe(
            select((state) => {
              let categories = [];
              if (params['categories']) {
                categories = params['categories'].split(',');
              }
              return getPostsByCategoriesIdSelector(state, categories);
            })
          )
        )
      )
      .subscribe((posts) => (this.posts = posts));

    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((posts) => {
      this.route.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { categories: posts.toString() },
        queryParamsHandling: 'merge',
      });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
