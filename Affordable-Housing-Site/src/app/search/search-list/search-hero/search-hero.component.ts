import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'll-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.scss']
})
export class SearchHeroComponent implements OnInit {
  particlesOptions = {
    particles: {
      color: {
        value: ['#ffffff', '#ffffff']
      },
      size: {
        value: 1
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 1
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
