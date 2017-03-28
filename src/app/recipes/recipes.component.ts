import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // console.log(`children: ${this.ar.children} \n\npathfromroot: ${this.ar.pathFromRoot} \n\nurl: ${JSON.stringify(this.ar.url)}`);
    this.ar.url.subscribe(a => console.log("xx", a));

  }

}
