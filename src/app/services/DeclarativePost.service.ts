import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IPost } from '../models/IPost';
import { Subject, combineLatest, throwError } from 'rxjs';

import { DeclarativeCategoryService } from './DeclarativeCatergory.service';

@Injectable({ providedIn: 'root' })
export class DeclarativePostService {





  posts$ = this.http
    .get<{ [id: string]: IPost }>(
      `https://angular-project-rxjs-default-rtdb.firebaseio.com/posts.json`
    )
    .pipe(
      map((posts) => {
        let postsData: IPost[] = [];
        for (let id in posts) {
          postsData.push({ ...posts[id], id });
        }
        return postsData;
      }),
      catchError(this.handleError)
    );

  // here im comnbining the both observers posts and catergories with combine lastest
  postWithCategory$ = combineLatest([
    this.posts$,
    this.categoryService.categories$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find(
            (category) => category.id === post.categoryId
          )?.title,
        } as IPost;
      });
    }),catchError(this.handleError)
  );

  private selectedPostSubject = new Subject<string>();
  selectedPostAction$ = this.selectedPostSubject.asObservable()

  selectPost(postid: string) {
    this.selectedPostSubject.next(postid)
  }

  post$ = combineLatest([this.postWithCategory$, this.selectedPostAction$]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find(post=>post.id===selectedPostId)
    }


    ));

  handleError(error: Error) {
    return throwError(() => {
      return "unknown error occured please try again"
    })
  }

    constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) { }

}


