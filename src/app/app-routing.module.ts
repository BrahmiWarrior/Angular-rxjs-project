import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { AltPostsComponent } from './pages/alt-posts/alt-posts.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'declarativeposts', component: DeclarativePostsComponent },
  { path: 'posts', component: PostsComponent },
  { path:'altposts', component:AltPostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
