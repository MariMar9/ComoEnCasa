import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload=new FileUpload(new File(["foo"], "foo.txt", {type: "text/plain"}));

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }

}