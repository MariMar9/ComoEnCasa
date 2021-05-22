import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../file-upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload=new FileUpload(new File(["foo"], "foo.txt", {type: "text/plain"}));
  percentage: number=0;

  constructor(private uploadService: UploadFileService) { 
    this.selectedFiles=null!;
  }

  ngOnInit() {
  }

  selectFile(event: Event) {
    this.selectedFiles = (<HTMLInputElement>event.target).files!;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined!;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}