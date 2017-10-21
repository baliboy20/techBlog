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
   this.route.data.subscribe(a => console.log('showstate', a['showstate']));
  }

  ngOnDestroy() {

  }

}
