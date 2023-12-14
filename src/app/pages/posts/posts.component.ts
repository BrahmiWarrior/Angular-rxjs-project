import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { postService } from 'src/app/services/postservice';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit ,OnDestroy{
  posts: IPost[] = []
  postSubscription !: Subscription; // when ever you subscribe you should be unsubscring it later other wise memory leakage will happen
  constructor(private postService :postService) {   // injecting the post service from the postservices.ts
  }
  ngOnInit(): void {
   this.postSubscription=  this.postService.getPostsWithCategories().subscribe(data => {
     this.posts = data;
      console.log(this.posts)
    })
  }
 ngOnDestroy(): void {
   this.postSubscription && this.postSubscription.unsubscribe();
 }
}
