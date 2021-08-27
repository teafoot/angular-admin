import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() uploadedUrl = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // console.log({files});

    const file = files.item(0);
    const data = new FormData();
    // @ts-ignore
    data.append('image', file);
    // console.log(data.get('image')); // File

    this.http.post(`${environment.api}/upload`, data)
      .subscribe((res: any) => {
        this.uploadedUrl.emit(res.url); // http://localhost:8000/api/uploads/...
      });
  }

  // upload(files: FileList): void {
    // const file = files.item(0);
    // const data = new FormData();
    // // @ts-ignore
    // data.append('image', file);
    //
    // this.http.post(`${environment.api}/upload`, data)
    //   .subscribe((res: any) => {
    //     this.uploaded.emit(res.url);
    //   });
  // }
}
