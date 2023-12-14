import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { ICategory } from "../models/ICategories"
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class categoryService {
  constructor(private http: HttpClient, ) { }

  getCategories() {
    return this.http.get <{ [id: string]: ICategory }>('https://angular-project-rxjs-default-rtdb.firebaseio.com/categories.json').pipe(
        map((categories) => {
          let categoriesData: ICategory[] = []; // here mapping all the object object data and converting into array of objects with the help of pipe and map operator
          for (let id in categories) {
            categoriesData.push({ ...categories[id], id });
          }
          console.log(categoriesData)
          return categoriesData;
        })
      )

  }

}
