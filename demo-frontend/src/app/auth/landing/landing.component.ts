import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from './carousel/carousel.const';
import { ICarouselItem } from './carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

  slidePhoto(): void {
    document.querySelector('.slider').scrollIntoView({ behavior: "smooth" });
  }

}
