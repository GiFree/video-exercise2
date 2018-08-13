import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, } from 'rxjs/operators';

import { VideoService } from '../video.service';
import { Video } from '../video';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos = new Subject<Video[]>();
  length = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50, 100];
  pageIndex = 0;
  pageEvent = new Subject<PageEvent>();
  order = 'recent';
  favorites = false;
  constructor(
    private videoService: VideoService,
    private authService: AuthService) { }

  ngOnInit() {

    this.pageEvent.next({ pageSize: this.pageSize, pageIndex: this.pageIndex } as PageEvent);

    this.pageEvent.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((event) => {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        if (this.favorites) {
          return this.videoService.getFavorites(this.pageSize, this.getOffset(), this.order);
        }
        return this.videoService.getVideos(this.pageSize, this.getOffset(), this.order);
      })
    ).subscribe(videos => this.videos.next(videos));


    this.videoService.getVideosAmount().subscribe(res => this.length = res.amount);

    this.getVideos();

  }

  private getVideos(): void {
    this.videoService
      .getVideos(this.pageSize, this.getOffset(), this.order)
      .subscribe(videos => this.videos.next(videos));
  }

  loadDemo(): void {
    this.videoService.loadDemo()
      .subscribe();
  }

  removeAll(): void {
    this.videoService.removeAll()
      .subscribe();
  }

  toggleOrder(): void {
    this.order = this.order === 'recent' ? 'oldest' : 'recent';
    this.pageEvent.next({ length: this.length, pageSize: this.pageSize, pageIndex: this.pageIndex });
  }

  loggedOn(): Boolean {
    return this.authService.isLoggedIn();
  }

  toggleFavorites(checkbox): void {
    this.favorites = !this.favorites;
    this.pageEvent.next({
      length: this.length,
      pageIndex: 0,
      pageSize: this.pageSize,
    });
  }

  private getOffset(): number {
    return this.pageIndex * this.pageSize;
  }
}
