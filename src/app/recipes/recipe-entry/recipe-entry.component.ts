import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDaoService} from "../../model/blog-dao.service";

@Component({
  selector: 'app-recipe-entry',
  templateUrl: './recipe-entry.component.html',
  styleUrls: ['./recipe-entry.component.scss']
})
export class RecipeEntryComponent implements OnInit, OnDestroy {

  private item: any;

  constructor(
    private ar: ActivatedRoute,
    private rou: Router,
    private  dao: BlogDaoService,
  ) { }

  ngOnInit() {
    this. getResultIfEditing();
    console.log('ngOnit for recipe-entry');
  }

  ngOnDestroy() {
    console.log('NgOnDestroy for recipe-entry');
  }

  getResultIfEditing() {

    if (this. ar.params['id'] !== null) {
      this.dao.getResultCached()
        .subscribe(console.log);
    }
  }

}


