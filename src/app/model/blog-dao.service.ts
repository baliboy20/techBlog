import {Injectable, Inject} from '@angular/core';
import {AngularFire, FirebaseApp, FirebaseListObservable} from "angularfire2";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable, Subject} from "rxjs";

export interface BlogItem {
  title: string,
  content: string,
  postedOn?: Date,
  tags?: string[],
  categories?: string[]
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
    console.log(value.title);
    console.log('dao', value);
    // this.af.database.list(blogPostPath+'/' +value.title).push(value)
    //   .then(a=>console.log('The Result is',a)).catch(a=>console.log('catching...',a['database']))
    this.af.database.object(blogPostPath).update({[value.title]: value}).then(a => a).catch(a => console.log('ERRR', a))
  }

  fromCatalog(): FirebaseListObservable<any> {

    return this.af.database.list(blogPostPath);
  }

  _toCatalog(filename, downloadUrl) {
    return this.af.database.object(blogPostPath + filename).update({[filename]: downloadUrl})
  }

  toStorage(value) {

    console.log('to storage XXXXXXX')
    value.title = (value.title as string).replace(/\s/g, '_');
    let blob = new Blob([JSON.stringify(value)]);

    this.fba.storage().ref().child(storePostPath + value.title).put(blob, {contentType: 'txt'})
      .then(res => {
        console.log('Post responese is', res.downloadURL);
        this._toCatalog(value.title, res.downloadURL).then(re => console.log('catalog updated'))
      })
      .catch(err => console.log('anerror has occurred', err));
  }

  _fromStore(url: any) {
    this.http.get(url)
      .map((a: Response) => a.json())
      .subscribe(console.log)
  }

  _denaturalize(title: string) {
    return (title as string).replace(/\s/g, '_');
  }


  retrieveFromStorage(filename?: string) {


    return this.fba.storage().ref().child(storePostPath + "my_title").getDownloadURL()
      .then(a => this._fromStore(a))
      .catch(err => console.log('FIREBASE ERROR', err));
  }


  findItem(key) {
    console.log('PPPPPPPPP...is found')   ;
    return this.af.database.object(storePostPath + key).map(a => a[key])

  }


  _delete(key) {
    // this.fba.object
      this.af.database.object(storePostPath +key)  .remove().then(
        result => console.log('result',result),
        error => console.log('error',error)
      )


    return Observable.of(42);
  }

  delete(key): Subject<any> {

    var result: Subject<any> = new Subject();

    this.findItem(key)
      .subscribe(a => {
                                                    //  ++++
        this.fba.storage().ref().child(storePostPath + key).delete()
          .then((a) => {
          console.log('about to delete...',key)
            this._delete_catalog_item(key)
              .then(a => result.next( {ok: true, msg: 'delete completed.', result: a}), a => result.next({ ok: false, msg:'Delete of catalog failed.', error:a}) )
          }
            ,a => result.next({ok:false, msg:'delete of storage failed',error:a})
          )
          .then(a=>{
            console.log('breaking the route');
            this.fba.storage().ref().child('').delete();
          })


      })


    return result;
  }


  _delete_catalog_item(key) {
    return this.af.database.object(storePostPath +key).remove();
  }

  exists(filename) {

  }


}
