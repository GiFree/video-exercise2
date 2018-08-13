import { Component, OnInit } from '@angular/core';

import { VideoService } from '../video.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

  constructor(
    private videoService: VideoService,
    private socketService: SocketService) { }

  ngOnInit() {
  }

  addVideo(url: string) {
    if (url) {
      this.videoService.addVideo(url)
        .subscribe(data => {
          this.socketService.addVideo(data.video);
        });
    }
  }

}
