import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  @Input() videos: Video[];
  currentRowspan = 1;
  currentOrder = 'recent';
  constructor() { }

  ngOnInit() {
  }

  toggleView() {
    this.currentRowspan = this.currentRowspan === 1 ? 4 : 1;
  }

}
