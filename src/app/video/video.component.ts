import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Video } from '../video';
import { VideoService } from '../video.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  constructor(
    private videoService: VideoService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  watch(): void {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      width: '80%',
      data: { video: this.video },
    });

    dialogRef.afterClosed().subscribe();
  }

  favorite(): void {
    this.videoService.favorite(this.video)
      .subscribe();
  }

  delete(): void {
    this.videoService.delete(this.video)
      .subscribe();
  }

  loggedOn(): boolean {
    return this.authService.isLoggedIn();
  }
}

@Component({
  selector: 'app-video-dialog',
  templateUrl: 'video-dialog.html'
})
export class VideoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Video) { }
}
