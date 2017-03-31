import { Component, OnInit } from '@angular/core';
import {BlogDaoService, BlogItem} from "../../model/blog-dao.service";
import {FirebaseListObservable} from "angularfire2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  list: FirebaseListObservable<{line: string}>;

  constructor(
    private dao: BlogDaoService,
  private router: Router
  ) { }
  ngOnInit() {
    this.dao.fromCatalog()

      .subscribe(a => {
        console.log(a)
        this.list = a;
      });
  }

  action(action: string, key: string) {

    switch(action) {
      case 'delete': {
     //   this.dao.delete(key).subscribe();
        console.log('deleting ....')
        break;
      }
      case 'edit': {
        console.log('boo hoo!', key)
        this.dao.findItemC(key)
        this .router.navigate(['../knowledgebase/recipes/recipe-entry', {id: (key)}])
        break;
      }
      case 'read' : {
        console.log('readingg....');
      }
    }
  }
}
