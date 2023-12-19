import { Component } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';
import { postService } from 'src/app/services/postservice';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss']
})
export class AltPostsComponent {
  posts$=this.postService.postWithCategory$
  constructor(private  postService: DeclarativePostService) {

  }

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault()
post.id && this.postService.selectPost(post.id)
  }
}
