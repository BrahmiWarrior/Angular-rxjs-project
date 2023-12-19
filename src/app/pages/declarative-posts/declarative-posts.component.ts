import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, combineLatest, map } from 'rxjs';
import { DeclarativeCategoryService } from 'src/app/services/DeclarativeCatergory.service';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent {
  selectedCategorySubject = new Subject<string>();
  selectedCategoryActions$ = this.selectedCategorySubject.asObservable();

  posts$ = this.postService.postWithCategory$;
  categories$ = this.categoryService.categories$;
  selectedCategoryId = '';

  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryActions$,
  ]).pipe(
    map(([posts, selectedCategoryId]) => {
      return posts.filter(
        (post) => post.categoryId === selectedCategoryId
      );
    })
  );

  constructor(
    private postService: DeclarativePostService,
    private categoryService: DeclarativeCategoryService
  ) {}
  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategorySubject.next(selectedCategoryId);
  }

}
