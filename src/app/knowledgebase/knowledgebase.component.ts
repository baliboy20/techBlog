import {Component, OnDestroy, OnInit} from '@angular/core';
import {advanceActivatedRoute} from "@angular/router/src/router_state";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-knowledgebase',
  templateUrl: './knowledgebase.component.html',
  styleUrls: ['./knowledgebase.component.scss']
})
export class KnowledgebaseComponent implements OnInit, OnDestroy {

  showLeftSide = true;

  constructor(private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
   console.log('XXXX', this.router.routerState);
  }

  ngOnDestroy() {
    console.log('ONdestroy knowlllybaes');
  }

}
