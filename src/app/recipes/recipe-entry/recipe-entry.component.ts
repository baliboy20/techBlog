import {
  Component,
  OnInit,
  ViewChild,
  trigger,
  style,
  state,
  animate,
  transition
} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BlogDaoService, BlogItem, TagChanges, BlogChanges} from "../../model/blog-dao.service";
import {ActivatedRoute} from "@angular/router";

const voidstate = {
  height: '0px'
};

const showstate = {
  backgroundColor: 'transparent',
  height: '100%',
  opacity: '1',
};

/**
 *  CLASS BLOG ITEM MODEL.
 */

export class BlogItemModel {


  blogItem: BlogItem;
  initial: BlogItem;


  constructor() {
    this.resetNew();
  }


  resetWithExisting(existing: BlogItem) {
    this.initial = existing;
    this.blogItem = JSON.parse(JSON.stringify(existing));
  }


  resetNew() {
    this.initial = {title: "", content: "", tags: [], categories: [], id: ""} as BlogItem;
    this.blogItem = {title: "", content: "", tags: [], categories: [], id: ""} as BlogItem;
  }


  tagChanges(): TagChanges {

    const ini = this.initial.tags;
    const blitm = this.blogItem.tags;
    const  added = blitm.filter(a => !ini.includes(a));
    const  deleted = ini.filter(a => !blitm.includes(a));
    const  retval = {tagsAdded: added, tagsDeleted: deleted, postId: this.blogItem.id};
    return retval;
  }


  categoriesChanges(): TagChanges {
    const  ini = this.initial.categories, blitm = this.blogItem.categories;
    const  added = blitm.filter(a => !ini.includes(a));
    const  deleted = ini.filter(a => !blitm.includes(a));

    return {tagsAdded: added, tagsDeleted: deleted, postId: this.blogItem.id}
  }


  getChanged(): BlogChanges {

    return {blogItem: this.blogItem, tagChanges: this.tagChanges(), categoryChanges: this.categoriesChanges()}
  }
}


export function anShowPreview() {
  return [
    trigger('showPreviewTrigger', [
      state('void', style(voidstate)),
      transition(':enter', animate("1250ms 0ms ease", style({'top': '50%'}))),
      transition(':leave', animate("1250ms 0ms ease", style({'top': '50%'})))
    ]),
    trigger('showConfirmationPopup',
      [
        state('x', style({'transform': 'translateX(-50%)'})),
        state('y', style({'transform': 'translateX(-50%)'})),
        transition('x => y', animate("1250ms 0ms ease", style({'transform': 'translate(50%,50%)'}))),
        transition('y => x', animate("1250ms 0ms ease", style({'transform': 'translate(50%, 50%)'}))),
      ])
  ]
}


@Component({
  selector: 'app-edit',
  templateUrl: './recipe-entry.component.html',
  styleUrls: ['./recipe-entry.component.scss'],
  animations: anShowPreview()
})
export class RecipeEntryComponent implements OnInit {

  edit_state = 'edit';
  showPreview = false;
  _key: string;
  _showConfirmationPopup = "x";
  @ViewChild('fmBlog') blog: NgForm;
  private mdl: BlogItemModel = new BlogItemModel;


  constructor(private dao: BlogDaoService,
              private activatedRoute: ActivatedRoute) {

    this.mdl = new BlogItemModel();
  }


  ngOnInit() {

    const states: any = this.activatedRoute.snapshot.params;

    this._key = this.activatedRoute.snapshot.params['item'];
    this.edit_state = this.activatedRoute.snapshot.data['state'];

    if (this.edit_state === 'edit') {

      this._retrieveItem();

    } else {

    }
  }


  _retrieveItem() {
    this.dao.findItem(this._key)
      .subscribe(res => {

        //   res
        //     .map((a: BlogItem) => {
        //       if (!a.categories) a.categories = [];
        //       if (!a.tags) a.tags = [];
        //       return a;
        //     })
        //     // .do(a => console.log('amended blogitem', a))
        //     .subscribe(a => this.mdl.resetWithExisting(a as BlogItem));
        //
      });
  }


  _insert() {
    // this.dao.insert(this.mdl.getChanged())
    //   .then(res => {
    //
    //     this.edit_state = "edit";
    //     this._key = res.id;
    //
    //     res.subscribe(a => this.mdl.resetWithExisting(a as BlogItem));
    //
    //     this._showConfirmationPopup = this._showConfirmationPopup === 'x' ? 'y' : 'x';
    //
    //   }, err => {
    //     console.log('Error on Insert', err)
    //   })
  }


  _update() {
    // this.dao.update(this.mdl.getChanged())
    //   .then(res => res.subscribe(a => this.mdl.resetWithExisting(a as BlogItem)));
  }


  submit(event: Event) {

    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (this.edit_state === 'edit') {
      // this._update()
    } else {
      this._insert();
    }

    return false;
  }
}
