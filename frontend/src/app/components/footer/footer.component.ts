import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let date = new Date();
    let year = date.getFullYear();
    document.getElementById("copyright-year").innerHTML = year.toString();
  }

}
