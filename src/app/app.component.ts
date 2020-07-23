import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentFeature: string;

  ngOnInit(): void {
    this.currentFeature = 'recipes';
  }

  onFeatureSelected(feature: string) {
    this.currentFeature = feature;
  }
}
