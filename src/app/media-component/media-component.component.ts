import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-component.component.html',
  styleUrls: ['./media-component.component.css'],
})
export class MediaComponent {
  @Input() selectedPlayer: any = null;

  playVideo(video: HTMLVideoElement) {
    video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  stopVideo(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }

  seekVideo(video: HTMLVideoElement, event: any) {
    const value = event.target.value;
    const seekTime = video.duration * (value / 100);
    video.currentTime = seekTime;
  }

  setVolume(video: HTMLVideoElement, event: any) {
    const value = event.target.value;
    video.volume = value;
  }
}