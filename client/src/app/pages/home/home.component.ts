import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log('Home Component');
  }
}
