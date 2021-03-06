import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { forkJoin } from 'rxjs/observable/forkJoin';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Candidate{
  Name: string;
  AddedOn: string;
  Skills: string;
  filename: string;
  url: string;
}

@Component({
  selector: 'app-getting-started-page',
  templateUrl: './getting-started-page.component.html',
  styleUrls: ['./getting-started-page.component.scss']
})
export class GettingStartedPageComponent implements OnInit {

  lstCandidates: Candidate[]=[];

  candidates: Observable<any[]>;
  resumes: Observable<any[]>;
  files:any[] = ["shakti.txt","mukesh.txt"];
  downloadUrlObservables: Observable<string>[];
  downloadUrls: string[];
  storage;
  ssurl;

  gridApi;
  gridColumnApi;

  columnDefs;
  rowData;

  constructor(fireDBstore: AngularFirestore,
    private fireFilestorage: AngularFireStorage,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef) {

      console.log("getting started");

      this.initGrid();

      //fetch data from Cloud Firestore
      this.candidates = fireDBstore.collection('Candidate').valueChanges();
      this.storage = fireFilestorage.storage;

      this.fetchDataInCustomCollection();
    
  }

  fetchDataInCustomCollection(){
    
    this.candidates.subscribe(tcandidates=> {
      this.lstCandidates = [];
      tcandidates.forEach((candidate: any)=>{
        var found = this.lstCandidates.filter(c=> c.Name == candidate.Name);

        if(found.length >0){
          const foundIndex = this.lstCandidates.indexOf(found[0]);
          this.lstCandidates.slice(foundIndex, 1);
        }
        //if(candidate.AddedOn != ''){
        //  candidate.AddedOn = this.convertToDate(candidate.AddedOn);
        //}
        this.lstCandidates.push(candidate);
      if(candidate.filename && candidate.filename != ''){
        this.updateURL(candidate.filename, candidate);
      }
      this.rowData = this.lstCandidates;

    });
    });
  }

  initGrid(){

    this.columnDefs = this.getColumnDef();
  }

  getColumnDef(){
    return [
      { field: 'Name' },
      { field: 'Date' },
      { field: 'Skills'},
      { field: 'url',
        cellRenderer: function(params) {
          return '<a href="' + params.value + '" target="_blank" rel="noopener">'+ params.data.filename+'</a>'
          //<a [href]="candidate.url" target="_blank">{{candidate.filename}}</a>
        }
      }
  ];
  }

  convertToDate(date: any):string{
    //1324339200000
    //1601562600
    //var date = new Date(Number(milli)*1000);
    return date.toDate();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  updateURL(file: string, candidate: any): void {
    var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

    // apply a forkJoin to get all the download urls at once.
    forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
      console.log("on updateURL: ", downloadUrls);
      candidate.url = downloadUrls[0];
      this.ssurl = downloadUrls[0];
      var found = this.lstCandidates.filter(c=> c.Name == candidate.Name);

        if(found.length >0){
          const foundIndex = this.lstCandidates.indexOf(found[0]);
          this.lstCandidates[foundIndex].url = downloadUrls[0].toString();
        }
        //this.rowData = this.lstCandidates;
        this.gridApi.applyTransaction({ update: this.lstCandidates });
      //candidate.next();
      //this.candidates.pipe(candidate);
      this.changeDetectorRef.detectChanges();
    });
    
  }

  download(file: string): void {
    var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

    // apply a forkJoin to get all the download urls at once.
    forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
      console.log("on download: ", downloadUrls);
      this.downloadUrl(downloadUrls[0].toString());
      
    });
    
  }

  downloadUrl(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  download2(file: string): void {
    var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

    // apply a forkJoin to get all the download urls at once.
    forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
      console.log("on download3: ", downloadUrls);
      this.openTab(downloadUrls[0], file);
      
    });
    
  }

  openTab(url, file) {
    // Create link in memory
    var a = window.document.createElement("a");
    a.target = '_blank';
    a.href = url;
 
    // Dispatch fake click
    var e = window.document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    a.dispatchEvent(e);
};

  openFile(file: any){
    var downloadUrlObservables = this.storage.ref().child(file).getDownloadURL();

    // apply a forkJoin to get all the download urls at once.
    forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
      console.log("on buttonclick: ", downloadUrls);

      let link = document.createElement('a');
link.setAttribute('type', 'hidden');
link.setAttribute('target', '_blank');
link.href = downloadUrls[0].toString();
link.download = file;
document.body.appendChild(link);
link.click();
link.remove();
      
    });
  }

  ngOnInit(): void {
  }

}

