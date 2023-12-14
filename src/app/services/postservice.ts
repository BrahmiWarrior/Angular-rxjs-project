import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';
import { map, mergeMap } from 'rxjs';
import { categoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class postService {
  constructor(
    private http: HttpClient,
    private categoryService: categoryService
  ) {}
  getPosts() {
    return this.http
      .get<{ [id: string]: IPost }>( // here mentioning the ipost types of data  with the help of model
        'https://angular-project-rxjs-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((posts) => {
          let postData: IPost[] = []; // here mapping all the object object data and converting into array of objects with the help of pipe and map operator
          for (let id in posts) {
            postData.push({ ...posts[id], id });
          }
          return postData;
        })
      );
  }
  getPostsWithCategories() {
    return this.getPosts().pipe(
      mergeMap((posts) => {
        return this.categoryService.getCategories().pipe(map((categories) => {
          return posts.map((post) => {
            return {
              ...post,
              categoryName: categories.find((category) => category.id === post.categoryId)?.title,

            }

          })

        }))
      })
    );

  }
}
