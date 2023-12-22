import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  map,
  scan,
  share,
  shareReplay,
} from 'rxjs/operators';
import { CRUDAction, IPost } from '../models/IPost';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  concat,
  merge,
  of,
  throwError,
} from 'rxjs';

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
      catchError(this.handleError),
      shareReplay(1) // adding sharereply to cache the observable reduce the number of https calls and make better performance
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
    }),
    shareReplay(1),
    catchError(this.handleError)
  );







  // here im trying to create the crud methods to push data into my firebase created a subject for that
  private postCRUDSubject = new Subject<CRUDAction<IPost>>();
  postCRUDAction$ = this.postCRUDSubject.asObservable();



//here im adding the post action i already have a schema in Ipost.ts action
  addPost(post: any) {
    this.postCRUDSubject.next({ action: 'add', data: post });
  }




//here im mergering 2 obervables and concat them to save in the data base and modifying the data with the help of modifyPosts

  allPosts$ = merge(
    this.postWithCategory$,
    this.postCRUDAction$.pipe(
      concatMap((postAction) =>
        this.savePosts(postAction).pipe(
          map((post) => ({ ...postAction, data: post }))
        )
      )
    )
  ).pipe(
    scan((posts, value) => {
      return this.modifyPosts(posts, value);
    }, [] as IPost[]),shareReplay(1)
  );



  //this is for modifying the posts and checking if the crud action is === the ipost action
  modifyPosts(posts: IPost[], value: IPost[] | CRUDAction<IPost>) {
    if (!(value instanceof Array)) {
      if (value.action === 'add') {
        return [...posts, value.data];
      }
    } else {
      return value;
    }
    return posts;
  }


// here im add post to the firebase server and mapping it to get the id
 addPostToServer(post: IPost) {
    return this.http
      .post<{ name: string }>(
        `https://angular-project-rxjs-default-rtdb.firebaseio.com/posts.json`,
        post
      )
      .pipe(
        map((id) => {
          return {
            ...post,
            id: id.name,
          };
        })
      );
  }


// here im saving the addpostoserver by checking the condition if postaction is === add if it true returing addposttoserver

  savePosts(postAction: CRUDAction<IPost>) {
    if (postAction.action === 'add') {
      return this.addPostToServer(postAction.data).pipe(concatMap((post) =>
        this.categoryService.categories$.pipe(map((categories) => {
          return {
            ...post,
            categoryName: categories.find(category=>category.id===post.categoryId)?.title
          }
        }))
      ));
    }
    return of(postAction.data);
  }


  private selectedPostSubject = new Subject<string>();
  selectedPostAction$ = this.selectedPostSubject.asObservable();
  categories: any;
 selectPost(postid: string) {
    this.selectedPostSubject.next(postid);
  }

   post$ = combineLatest([
    this.allPosts$,
    this.selectedPostAction$,
  ]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find((post) => post.id === selectedPostId);
    })
  );



// just handling the errors if there is any error calls in http
  handleError(error: Error) {
    return throwError(() => {
      return 'unknown error occured please try again';
    });
  }



  constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) {}
}
