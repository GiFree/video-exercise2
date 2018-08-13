import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = io('http://localhost:3000');
  videoSubject = new Subject();
  constructor() {
    this.socket.on('video', (video) => {
      this.videoSubject.next(video);
    });
  }

  addVideo(video) {
    this.socket.emit('video', { video });
  }

  getVideoStream(): Observable<any> {
    return this.videoSubject;
  }
}
