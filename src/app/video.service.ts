import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videosSubject = new Subject<Video[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  getVideos(limit: number, offset: number = 0, order: string = 'recent'): Observable<Video[]> {
    const query = `?limit=${limit}&offset=${offset}&order=${order}`;

    this.getVideosRequest(query).subscribe(videos => this.videosSubject.next(videos));

    return this.createValidDate(this.videosSubject);
  }

  getFavorites(limit: number, offset: number = 0, order: string = 'recent'): Observable<Video[]> {

    return this.authService.getUserId().pipe(
      switchMap(id => {
        const query = `?limit=${limit}&offset=${offset}&order=${order}&id=${id.id}`;
        return this.createValidDate(this.getVideosRequest(query));
      })
    );
  }

  private createValidDate(stream: Observable<Video[]>): Observable<Video[]> {
    return stream.pipe(
      map(videos => {
        return videos.map((video) => {
          return {
            ...video,
            createdAt: new Date(video.createdAt),
          } as Video;
        });
      })
    );
  }

  private getVideosRequest(query: string): Observable<Video[]> {
    return this.http.get<Video[]>(`http://localhost:3000/api/videos${query}`);
  }

  getVideosAmount(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/videos/count');
  }

  favorite(video: Video): Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/favorites/${video.id}`, {});
  }

  delete(video: Video): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/videos/${video.id}`);
  }

  loadDemo(): Observable<any> {
    return this.http.post('http://localhost:3000/api/seed', {});
  }

  removeAll(): Observable<any> {
    return this.http.delete('http://localhost:3000/api/videos');
  }

  addVideo(url: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/videos/add', { url });
  }

}
