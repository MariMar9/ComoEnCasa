import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileUpload } from './file-upload';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<any> {
    console.log("--------ENTRA EN PUSH FILE----------")
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);


    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        console.log("--------ENTRA EN PUSH snapshotChanges----------")
        storageRef.getDownloadURL().subscribe(downloadURL => {    
         /* console.log("downloadURL: ")
          console.log(downloadURL)
          if (localStorage.getItem("imagenesLocalStorage")) {
            console.log("---soy el if")
            var imagenesLocalStorage=localStorage.getItem("imagenesLocalStorage");
            imagenesLocalStorage=imagenesLocalStorage!.concat(";"+downloadURL)!;
            localStorage.setItem("imagenesLocalStorage", imagenesLocalStorage);
            console.log("imagenesLocalStorage del service: "+imagenesLocalStorage);*/
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);  
            
          /*} else {
            console.log("---soy el else")
            localStorage.setItem("imagenesLocalStorage", downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          }*/
          
        });
        
    
           

      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFileUploads(numberItems:number): AngularFireList<any> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(this.basePath).remove(key);
  }

  deleteFileStorage(name: string) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}