import {Injectable, Inject} from '@angular/core';
import {AngularFire, FirebaseApp, FirebaseListObservable} from "angularfire2";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';

export interface BlogItem {
  title: string;
  content: string;
  postedOn?: Date;
  tags?: string[ ];
  categories?: string[ ];
}

const blogPostPath = "tech-blog/posts/";
const storePostPath = blogPostPath;

@Injectable()
export class BlogDaoService {

  constructor(private af: AngularFire,
              private http: Http,
              @Inject(FirebaseApp) private fba: any) {
  }

  postBog(value) {
    value.title = (value.title as string).replace(/\s/g, '_');
    this.af.database.object(blogPostPath).update({[value.title]: value}).then(a => a).catch(a => console.log('ERRR', a));
  }

  fromCatalog(): FirebaseListObservable<any> {

    return this.af.database.list(blogPostPath);
  }

 private _toCatalog(filename, downloadUrl) {
    return this.af.database.object(blogPostPath + filename).update({[filename]: downloadUrl});
  }

  toStorage(value) {

    value.title = (value.title as string).replace(/\s/g, '_');
    const blob = new Blob([JSON.stringify(value)]);

    this.fba.storage().ref().child(storePostPath + value.title).put(blob, {contentType: 'txt'})
      .then(res => {
        console.log('Post responese is', res.downloadURL);
        this._toCatalog(value.title, res.downloadURL).then(re => console.log('catalog updated'));
      })
      .catch(err => console.log('anerror has occurred', err));
  }

  private _fromStore(url: any) {
    this.http.get(url)
      .map((a: Response) => a.json())
      .subscribe(console.log);
  }


  retrieveFromStorage(filename?: string) {

    return this.fba.storage().ref().child(storePostPath + "my_title").getDownloadURL()
      .then(a => this._fromStore(a))
      .catch(err => console.log('FIREBASE ERROR', err));
  }


  findItem(key) {
    return this.af.database.object(storePostPath + key).map(a => a[key]);
  }


  private _delete(key) {
      this.af.database.object(storePostPath + key)  .remove().then(
        result => console.log('result', result),
        error => console.log('error', error)
      );

    return Observable.of(42);
  }



  delete(key): Subject<any> {

    const result: Subject<any> = new Subject();

    this.findItem(key)
      .subscribe(a => {

        this.fba.storage().ref().child(storePostPath + key).delete()
          .then((ab) => {

            this._delete_catalog_item(key)
              .then( a1 => result.next( {ok: true, msg: 'delete completed.', result: a1})
                , a2 => result.next({ ok: false, msg: 'Delete of catalog failed.', error: a2}) );
          }
            , a3 => result.next({ok: false, msg: 'delete of storage failed', error: a3})
          )
          .then(a4 => {
            console.log('breaking the route');
            this.fba.storage()
              .ref()
              .child('')
              .delete();
          });

      });

    return result;
  }


  private _delete_catalog_item(key) {
    return this.af.database.object(storePostPath + key).remove();
  }



}
