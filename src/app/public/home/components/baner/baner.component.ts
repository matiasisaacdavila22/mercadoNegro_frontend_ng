import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baner',
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css']
})
export class BanerComponent implements OnInit {

  images: string[] = [
    'assets/img/store/product_1.png',
    'assets/img/store/product_2.png',
    'assets/img/store/product_1.png',
  ];

  constructor() { }

  ngOnInit() {
  }

}
