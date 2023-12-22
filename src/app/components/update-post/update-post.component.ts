import { Component } from '@angular/core';
import { DeclarativeCategoryService } from 'src/app/services/DeclarativeCatergory.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent {

  category$ = this.categoryService.categories$
  constructor(private categoryService:DeclarativeCategoryService ) {
  }
}


