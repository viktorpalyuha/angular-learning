import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() incrementingNumber = new EventEmitter<number>();
  interval;
  newNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame(): void {
    this.interval = setInterval(() => {
      this.incrementingNumber.emit(++this.newNumber);
    }, 1000);
  }

  onStopGame(): void {
    clearInterval(this.interval);
  }
}
