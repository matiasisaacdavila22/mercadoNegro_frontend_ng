import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  isLogged: Boolean = false;
  subscription!: Subscription;

  constructor(private service: SecurityService) { }

  ngOnInit(): void {
    this.subscription = this.service.getStoreData().subscribe(data => {
      this.isLogged = data.isLoggend;
    });
  }
}
