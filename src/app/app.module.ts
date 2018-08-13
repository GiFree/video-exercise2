import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { VideoListComponent } from './video-list/video-list.component';
import { LoginComponent, LoginDialogComponent } from './login/login.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoComponent, VideoDialogComponent } from './video/video.component';
import { AuthInterceptor } from './auth-interceptor';
import { RecentVideosComponent } from './recent-videos/recent-videos.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoListComponent,
    LoginComponent,
    LoginDialogComponent,
    VideoAddComponent,
    VideoComponent,
    VideoDialogComponent,
    RecentVideosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatListModule
  ],
  entryComponents: [
    LoginDialogComponent,
    VideoDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
