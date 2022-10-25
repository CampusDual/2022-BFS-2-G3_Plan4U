import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slidePhoto(): void {
    document.querySelector('.slider').scrollIntoView({behavior: "smooth"});
  }

}
