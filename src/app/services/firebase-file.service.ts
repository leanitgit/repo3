import 'firebase/analytics';
import 'firebase/database';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseFileService {
  analytics;

  constructor(
    private rtdb: AngularFireDatabase,
    private stdb: AngularFirestore) {
      this.analytics = firebase.analytics();
  }

  getUser(uid) {
    return this.stdb
      .doc(`users/${uid}`)
      .get();
  }

  updateUser(uid, data) {
    return this.stdb
      .doc(`users/${uid}`)
      .update(data)
      .then(() => {

      })
      .catch(error => {
        this.stdb.doc(`users/${uid}`).set(data);
      });
  }

  logEvent(eventName, data = {}) {
    // firebase.analytics().logEvent(eventName, { param1: 'pepe'});
    this.analytics.logEvent(eventName, data);
  }

  
  // download(file: string): void {
  //   var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

  //   // apply a forkJoin to get all the download urls at once.
  //   forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
  //     console.log("on download: ", downloadUrls);
  //     this.downloadUrl(downloadUrls[0].toString());
      
  //   });
    
  // }

  // downloadUrl(url: string): Observable<Blob> {
  //   return this.http.get(url, {
  //     responseType: 'blob'
  //   })
  // }

  // download2(file: string): void {
  //   var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

  //   // apply a forkJoin to get all the download urls at once.
  //   forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
  //     console.log("on download3: ", downloadUrls);
  //     this.openTab(downloadUrls[0], file);
      
  //   });
    
  // }

  // openTab(url, file) {
  //   // Create link in memory
  //   var a = window.document.createElement("a");
  //   a.target = '_blank';
  //   a.href = url;
 
  //   // Dispatch fake click
  //   var e = window.document.createEvent("MouseEvents");
  //   e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
  //   a.dispatchEvent(e);
  // };

//   openFile(file: any){
//     var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

//     // apply a forkJoin to get all the download urls at once.
//     forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
//       console.log("on buttonclick: ", downloadUrls);

//       let link = document.createElement('a');
// link.setAttribute('type', 'hidden');
// link.setAttribute('target', '_blank');
// link.href = downloadUrls[0].toString();
// link.download = file;
// document.body.appendChild(link);
// link.click();
// link.remove();
      
//     });
//   }

}
