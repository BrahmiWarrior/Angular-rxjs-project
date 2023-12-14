import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPost } from '../models/IPost';
import { combineLatest } from 'rxjs';

import { DeclarativeCategoryService } from './DeclarativeCatergory.service';

@Injectable({ providedIn: 'root', })




export class DeclarativePostService {
    constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) { }


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
      })
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
          categoryName:categories.find(category=> category.id === post.categoryId)?.title
        } as IPost;
      });
    })
  );

}
