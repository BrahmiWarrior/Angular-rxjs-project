import { Component } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';
import { postService } from 'src/app/services/postservice';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss'],
})
export class AltPostsComponent {
  showAddPost = false;
  posts$ = this.postService.allPosts$.pipe(
    tap((posts) => {
      posts[0].id && this.postService.selectPost(posts[0].id);
    })
  );
  selectedPost$ = this.postService.post$;
  constructor(private postService: DeclarativePostService) {}


  vm$ = combineLatest([this.posts$, this.selectedPost$]).pipe(
    map(([posts, selectedPosts]) => {
      return { posts, selectedPosts };
    })
  ); /// avoiding multiple async opertors in the hmtl and combines both posts and selected posts and using vm as  a single asyc in the html to increase the performance

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    this.showAddPost = false;
    post.id && this.postService.selectPost(post.id);
  }
   onAddPost() {
    this.showAddPost = true;
  }
}



