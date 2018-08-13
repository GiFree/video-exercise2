import { Component, OnInit } from '@angular/core';

import { SocketService } from '../socket.service';
import { Video } from '../video';

@Component({
  selector: 'app-recent-videos',
  templateUrl: './recent-videos.component.html',
  styleUrls: ['./recent-videos.component.css']
})
export class RecentVideosComponent implements OnInit {
  videos: Video[] = [];
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getVideoStream()
      .subscribe(video => {
        this.videos.push(video);
      });
  }

}
