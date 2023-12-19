import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/ICategories';
import { map, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  categories$ = this.http
    .get<{ [id: string]: ICategory }>(
      `https://angular-project-rxjs-default-rtdb.firebaseio.com/categories.json`
    )
    .pipe(
      map((categories) => {
        let categoriesData: ICategory[] = [];
        for (let id in categories) {
          categoriesData.push({ ...categories[id], id });
        }
        console.log(categoriesData)
        return categoriesData;
      }),shareReplay(1)// adding sharereply to cache the observable reduce the number of https calls and make better performance

    );
  constructor(private http: HttpClient) {}
}
