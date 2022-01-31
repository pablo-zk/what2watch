import { Component } from '@angular/core';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  /* constructor() {} */

  constructor(private VideoPlayer: VideoPlayer) {
    this.VideoPlayer.play('https://www.youtube.com/watch?v=PhhizQfrgHo');
  }
}
