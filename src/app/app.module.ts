import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { AltPostsComponent } from './pages/alt-posts/alt-posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    DeclarativePostsComponent,
    HomeComponent,
    AltPostsComponent,
    SinglePostComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
