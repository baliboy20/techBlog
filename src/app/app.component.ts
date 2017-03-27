import { Component } from '@angular/core';
import {BlogDaoService} from "./model/blog-dao.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor(private service:BlogDaoService){
    this.service.fromCatalog().subscribe(a=>console.log("From Catalog",a))
  }
}
