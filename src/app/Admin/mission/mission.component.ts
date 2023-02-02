import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { AdminService } from 'src/app/Services/admin.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class MissionComponent implements OnInit {

  missionModel!: FormGroup;
  cityList!: any;
  countryList!: any;
  themeList!: any;
  skillList!: any;
  availabilityList!: any;
  formData = new FormData();
  missionId!: number;
  action = "";
  selectedImages:any = [];
  selectedDocs:any = [];
  progressInfos: any;
  imgprogress!: number;
  docprogress!: number;
  
  constructor(private fb: FormBuilder, private mission: AdminService, private datePipe: DatePipe,
    private dialogref: MatDialogRef<MissionComponent>, @Inject(MAT_DIALOG_DATA) private data: number){ 
      this.missionId = data
  }


  ngOnInit(): void {
    this.missionModel = this.fb.group({
      missionTitle: ['',[Validators.required]],
      countryId: ['',[Validators.required]],
      cityId: ['',[Validators.required]],
      missionType: ['',[Validators.required]],
      missionDescription: ['',[Validators.required]],
      organizationName: ['',[Validators.required]],
      organizationDetail: ['',[Validators.required]],
      themeId: ['',[Validators.required]],
      skills: [[], [Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      totalSeats: ['',[Validators.required]],
      registrationDeadline: ['',[Validators.required]],
      availability: ['',[Validators.required]],
      images: [''],
      documents: ['']
    });

    if(this.missionId != null){
      this.mission.getMissionData(this.missionId).subscribe(
        (res:any) => {
          this.missionModel.controls["missionTitle"].setValue(res.mission.missionTitle);
          this.missionModel.controls["countryId"].setValue(res.mission.countryId.toString());
          this.missionModel.controls["cityId"].setValue(res.mission.cityId.toString());
          this.missionModel.controls["missionType"].setValue(res.mission.missionType);
          this.missionModel.controls["missionDescription"].setValue(res.mission.missionDescription);
          this.missionModel.controls["organizationName"].setValue(res.mission.organizationName);
          this.missionModel.controls["organizationDetail"].setValue(res.mission.organizationDetail);
          this.missionModel.controls["themeId"].setValue(res.mission.themeId.toString());
          this.missionModel.controls["skills"].setValue(res.mission.skills);
          this.missionModel.controls["startDate"].setValue(res.mission.startDate);
          // this.missionModel.controls["endDate"].setValue(this.datePipe.transform(res.missionRequest.endDate, 'yyyy-MM-dd'));
          this.missionModel.controls["endDate"].setValue(res.mission.endDate);
          this.missionModel.controls["totalSeats"].setValue(res.mission.totalSeats);
          this.missionModel.controls["registrationDeadline"].setValue(res.mission.registrationDeadline);
          this.missionModel.controls["availability"].setValue(res.mission.availability);
          this.missionModel.controls["images"].setValue(res.mission.images);
          this.missionModel.controls["documents"].setValue(res.mission.documents);
          this.countryList = res.countryList;
          this.cityList = res.cityList;
          this.themeList = res.themeList;
          this.skillList = res.skillList;
          this.availabilityList = res.availabilityList;
          this.action = "Update"
        },
        error => {
          console.log('Error', error)
        });
    }
    else{
      this.mission.getMissionData().subscribe(
        (res:any) => {
          this.countryList = res.countryList;
          this.cityList = res.cityList;
          this.themeList = res.themeList;
          this.skillList = res.skillList;
          this.availabilityList = res.availabilityList;
          this.action = "Add";
        },
        error => {
          console.log('Error', error)
        });
    }      
  }

  get missionTitle(){
    return this.missionModel.get('missionTitle');
  }

  get countryId(){
    return this.missionModel.get('countryId');
  }

  get cityId(){
    return this.missionModel.get('cityId');
  }

  get missionType(){
    return this.missionModel.get('missionType');
  }

  get missionDescription(){
    return this.missionModel.get('missionDescription');
  }

  get organizationName(){
    return this.missionModel.get('organizationName');
  }

  get organizationDetail(){
    return this.missionModel.get('organizationDetail');
  }

  get themeId(){
    return this.missionModel.get('themeId');
  }

  get skills(){
    return this.missionModel.get('skills');
  }

  get startDate(){
    return this.missionModel.get('startDate');
  }

  get endDate(){
    return this.missionModel.get('endDate');
  }

  get totalSeats(){
    return this.missionModel.get('totalSeats');
  }

  get registrationDeadline(){
    return this.missionModel.get('registrationDeadline');
  }

  get availability(){
    return this.missionModel.get('availability');
  }

  get images(){
    return this.missionModel.get('images');
  }

  get documents(){
    return this.missionModel.get('documents');
  }

  onSubmit(){
    this.mission.postMissionData(this.missionModel.value, this.missionId)
    .subscribe(
      res => {
        console.log('Success', res)
        if(this.missionId != null){
          Swal.fire('Updated!', 'Mission updated successfully!', 'success'); 
        }
        else{
          Swal.fire('Added!', 'Mission added successfully!', 'success'); 
        }               
        this.dialogref.close();
      },
      error => {
        console.log('Error',error)
        Swal.fire('Error!...', 'Error in mission adding, please try again!', 'error');
      }
    );
  }


  bindCityList(){    
    this.missionModel.controls["cityId"].setValue('');
    this.mission.getCityData(this.countryId?.value)
    .subscribe(
      (res: any) => {
        this.cityList = res;
        }, 
      (error: any) => {
        console.log('Error', error);
      } );  
  }

  imgfileChange(event: any){
    console.log(event)
    this.selectedImages = [];
    this.imgprogress = 0;
    // Prevent default behavior(file from being opened)
    if(event.target.files.length == 0){
      return;
    }
    event.preventDefault();
    

    for(var i=0; i<event.target.files.length; i++){
      let file = <File>event.target.files[i];
      let obj = {
        fileName: file.name,
        selectedFile: file,
        fileId: `${file.name}-${file.lastModified}`,
        uploadCompleted: false
      }
      this.selectedImages.push(obj);
      // console.log('... file[' + i + '].name = ' + file.name);
    }
    console.log(this.selectedImages);
  }

  uploadImages(){
    if(this.selectedImages.length == 0) {
      Swal.fire('Select Images', 'please select images for upload', 'warning');
      return;
    }       
    
    const formData = new FormData();
    this.selectedImages.forEach((f: any) => {
      formData.append('images', f.selectedFile, f.fileName);
    });
    
    this.mission.uploadImage(formData).subscribe( 
      (event: any) => {
        if(event.type === HttpEventType.UploadProgress){
          // this.progressInfos[idx].value = Math.round(100 * res.loaded / res.total);
          this.imgprogress = Math.round(100 * event.loaded / event.total);
          console.log(Math.round(100 * event.loaded / event.total));
        }
        else if(event.type === HttpEventType.Response){
          console.log(event.body.result);
          this.missionModel.controls["images"].setValue(event.body.result);
          Swal.fire('Uploaded','Images uploaded successfully!','success');
        }
      },
      // (res: any) => {        
      //   this.missionModel.controls["images"].setValue(res.result);
      //   // this.imageBase64 = res.imagebase64;
      //   Swal.fire('Uploaded','Image uploaded successfully!','success');
      // }
      // },
      (error: any) => {
        if(error.status != 200){
          if(error.error.validationmsg != undefined){
            Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
          } 
          else{
            Swal.fire('Upload Failed!...', 'Error in images uploading, please try again!', 'error');
          }
        }             
      }
    )
  }

  docfileChange(event: any){
    this.selectedDocs = [];
    this.docprogress = 0;

    if(event.target.files.length == 0){
      return;
    }
    event.preventDefault();

    for(var i=0; i<event.target.files.length; i++){
      let file = <File>event.target.files[i];
      let obj = {
        fileName: file.name,
        selectedFile: file,
        fileId: `${file.name}-${file.lastModified}`,
        uploadCompleted: false
      }
      this.selectedDocs.push(obj);
    }
    console.log(this.selectedDocs);
  }

  uploadDocuments(){
    if(this.selectedDocs.length == 0) {
      Swal.fire('Select Documents', 'please select documents for upload', 'warning');
      return;
    }       
    
    const formData = new FormData();
    this.selectedDocs.forEach((f: any) => {
      formData.append('docs', f.selectedFile, f.fileName);
    });
    
    this.mission.uploadDoc(formData).subscribe( 
      (event: any) => {
        if(event.type === HttpEventType.UploadProgress){
          // this.progressInfos[idx].value = Math.round(100 * res.loaded / res.total);
          this.docprogress = Math.round(100 * event.loaded / event.total);
          console.log(Math.round(100 * event.loaded / event.total));
        }
        else if(event.type === HttpEventType.Response){
          console.log(event.body.result);
          this.missionModel.controls["documents"].setValue(event.body.result);
          Swal.fire('Uploaded','Documents uploaded successfully!','success');
        }
      },
      (error: any) => {
        if(error.status != 200){
          if(error.error.validationmsg != undefined){
            Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
          } 
          else{
            Swal.fire('Upload Failed!...', 'Error in documents uploading, please try again!', 'error');
          }
        }             
      }
    )
  }

  deleteImg(file: any){
    this.selectedImages.splice(this.selectedImages.indexOf(file), 1);
  }
  deleteDoc(file: any){
    this.selectedDocs.splice(this.selectedDocs.indexOf(file), 1);
  }

  //ngOnItIT portion
  // this.route.queryParams.subscribe(
    //   params => {
    //     if(params['id'] != undefined){
    //       this.missionId = params['id'];
    //       this.mission.getMissionData(this.missionId).subscribe(
    //         (res:any) => {
    //           this.missionModel.controls["missionTitle"].setValue(res.missionRequest.missionTitle);
    //           this.missionModel.controls["countryId"].setValue(res.missionRequest.countryId.toString());
    //           this.missionModel.controls["cityId"].setValue(res.missionRequest.cityId.toString());
    //           this.missionModel.controls["missionType"].setValue(res.missionRequest.missionType);
    //           this.missionModel.controls["missionDescription"].setValue(res.missionRequest.missionDescription);
    //           this.missionModel.controls["organizationName"].setValue(res.missionRequest.organizationName);
    //           this.missionModel.controls["organizationDetail"].setValue(res.missionRequest.organizationDetail);
    //           this.missionModel.controls["startDate"].setValue(res.missionRequest.startDate);
    //           // this.missionModel.controls["endDate"].setValue(this.datePipe.transform(res.missionRequest.endDate, 'yyyy-MM-dd'));
    //           this.missionModel.controls["endDate"].setValue(res.missionRequest.endDate);
    //           this.missionModel.controls["totalSeats"].setValue(res.missionRequest.totalSeats);
    //           this.missionModel.controls["registrationDeadline"].setValue(res.missionRequest.registrationDeadline);
    //           this.missionModel.controls["images"].setValue(res.missionRequest.images);
    //           this.missionModel.controls["documents"].setValue(res.missionRequest.documents);
    //           this.imageBase64 = res.missionRequest.imagebase64;
    //           this.docBase64 = res.missionRequest.docbase64;
    //           this.countryList = res.countryList;
    //           this.cityList = res.cityList;
    //           console.log(this.datePipe.transform(res.missionRequest.startDate, 'dd-MM-yyyy'))
    //           this.action = "Update"
    //         },
    //         error => {
    //           console.log('Error', error)
    //         });
    //     }
    //     else{
    //       this.mission.getMissionData().subscribe(
    //         (res:any) => {
    //           this.countryList = res.countryList;
    //           this.cityList = res.cityList;
    //           this.action = "Add";
    //         },
    //         error => {
    //           console.log('Error', error)
    //         });
    //     }
    //   }
    // )  

  // processImage(imagefiles: any){    
  //   if(imagefiles.length == 0) {
  //     Swal.fire('Select Image', 'please select image for upload', 'warning');
  //     return;
  //   }       
    
  //   const formData = new FormData();
  //   imagefiles.forEach((Image: File) => {
  //     formData.append('images', Image, Image.name);
  //   });
    
  //   this.mission.uploadImage(formData).subscribe(
  //     (res: any) => {
  //       this.missionModel.controls["images"].setValue(res.result);
  //       Swal.fire('Uploaded','Image uploaded successfully!','success');
  //     },
  //     error => {
  //       if(error.status != 200){
  //         if(error.error.validationmsg != undefined){
  //           Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
  //         } 
  //         else{
  //           Swal.fire('Upload Failed!...', 'Error in image uploading, please try again!', 'error');
  //         }
  //       }             
  //     }
  //   )
  // }

  // processDocument(docfiles: any){    

  //   if(docfiles.length == 0) {
  //     Swal.fire('Select Document', 'please select document for upload', 'warning');
  //     return;
  //   } 

  //   const formData = new FormData();
  //   docfiles.forEach((Document: File) => {
  //     formData.append('docs', Document, Document.name);
  //   });
    
  //   this.mission.uploadDoc(formData).subscribe(
  //     (res: any) => {
  //       this.missionModel.controls["documents"].setValue(res.result);
  //       Swal.fire('Uploaded','Document uploaded successfully!','success');
  //     },
  //     error => {
  //       if(error.status != 200){
  //         if(error.error.validationmsg != undefined){
  //           Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
  //         } 
  //         else{
  //           Swal.fire('Upload Failed!...', 'Error in document uploading, please try again!', 'error');
  //         }
  //       }             
  //     }
  //   )
  // }

  // processImage(Image: any){    
  //   if(Image.length == 0) {
  //     Swal.fire('Select Image', 'please select image for upload', 'warning');
  //     return;
  //   }       
    
  //   let fileUpload = <File>Image[0];
  //   const formData = new FormData();
  //   formData.append('Image', fileUpload, fileUpload.name);
  //   this.mission.uploadImage(formData).subscribe(
  //     (res: any) => {
  //       this.missionModel.controls["images"].setValue(res.result);
  //       this.imageBase64 = res.imagebase64;
  //       Swal.fire('Uploaded','Image uploaded successfully!','success');
  //     },
  //     error => {
  //       if(error.status != 200){
  //         if(error.error.validationmsg != undefined){
  //           Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
  //         } 
  //         else{
  //           Swal.fire('Upload Failed!...', 'Error in image uploading, please try again!', 'error');
  //         }
  //       }             
  //     }
  //   )
  // }

  // processDocument(Document: any){    
  //   if(Document.length == 0) {
  //     Swal.fire('Select Document', 'please select document for upload', 'warning');
  //     return;
  //   } 
    
  //   let fileUpload = <File>Document[0];
  //   const formData = new FormData();
  //   formData.append('Doc', fileUpload, fileUpload.name);
  //   this.mission.uploadDoc(formData).subscribe(
  //     (res: any) => {
  //       this.missionModel.controls["documents"].setValue(res.result);
  //       this.docBase64 = res.docbase64;
  //       Swal.fire('Uploaded','Document uploaded successfully!','success');
  //     },
  //     error => {
  //       if(error.status != 200){
  //         if(error.error.validationmsg != undefined){
  //           Swal.fire('Upload Failed!...', error.error.validationmsg+'!', 'error');
  //         } 
  //         else{
  //           Swal.fire('Upload Failed!...', 'Error in document uploading, please try again!', 'error');
  //         }
  //       }             
  //     }
  //   )
  // }

  // downloadImage(){
  //   const source = `data:image/png;base64,${this.imageBase64}`;
  //   const link = document.createElement("a");
  //   console.log(link); 
  //   link.href = source;
  //   link.download = 'Mission.png'
  //   link.click();
  // }

  // downloadDoc(){
  //   const source = `data:application/pdf;base64,${this.docBase64}`;
  //   const link = document.createElement("a");
  //   console.log(link); 
  //   link.href = source;
  //   link.download = 'Mission.pdf'
  //   link.click();
  // }

  // dropFiles(event: any) {
  //   console.log(event.dataTransfer.items)
  //   // Prevent default behavior(file from being opened)
  //   event.preventDefault();

  //   if (event.dataTransfer.items) {
  //     // Use DataTransferItemList interface to access the file(s)
  //     for (var i = 0; i < event.dataTransfer.items.length; i++) {
  //       // If dropped items aren't files, reject them
  //       if (event.dataTransfer.items[i].kind === 'file') {
  //         let file = event.dataTransfer.items[i].getAsFile();
  //         let obj = {
  //           fileName: file.name,
  //           selectedFile: file,
  //           fileId: `${file.name}-${file.lastModified}`,
  //           uploadCompleted: false
  //         }
  //         this.selectedFiles.push(obj);
  //         console.log('... file[' + i + '].name = ' + file.name);
  //       }
  //     }
  //     this.selectedFiles.forEach((file: any) => this.getFileUploadStatus(file));
  //   } else {

  //     for (var i = 0; i < event.dataTransfer.files.length; i++) {
  //       console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
  //     }
  //   }
  // }

  // dragOverHandler(event:any) {
  //   console.log('File(s) in drop zone');

  //   // Prevent default behavior (Prevent file from being opened)
  //   event.preventDefault();
  //   event.stopPropagation();
  // }



  // getFileUploadStatus(file:any){
  //   // fetch the file status on upload
  //   let headers = new HttpHeaders({
  //     "size": file.selectedFile.size.toString(),
  //     "x-file-id": file.fileId,
  //     'name': file.fileName
  //   });

  //   this.http
  //     .get("http://localhost:3000/status", { headers: headers }).subscribe(
  //       (res: any) => {
  //         file.uploadedBytes = res.uploaded;
  //         file.uploadedPercent = Math.round(100* file.uploadedBytes/file.selectedFile.size);
  //         if(file.uploadedPercent >= 100){
  //           file.uploadCompleted = true;
  //         }
  //       },err => {
  //         console.log(err);
  //       }
  //     )
  // }

  // uploadFiles(){
  //   this.selectedFiles.forEach((file: { uploadedPercent: number; }) => {
  //     if(file.uploadedPercent < 100)
  //       this.resumeUpload(file);
  //   })
  // }

  // resumeUpload(file: { uploadedPercent: any; selectedFile?: any; fileId?: any; uploadedBytes?: any; fileName?: any; uploadCompleted?: any; }){
  //   //make upload call and update the file percentage
  //   const headers2 = new HttpHeaders({
  //     "size": file.selectedFile.size.toString(),
  //     "x-file-id": file.fileId,
  //     "x-start-byte": file.uploadedBytes.toString(),
  //     'name': file.fileName
  //   });
  //   console.log(file.uploadedBytes, file.selectedFile.size, file.selectedFile.slice(file.uploadedBytes).size);

  //   const req = new HttpRequest('POST', "http://localhost:3000/upload", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1),{
  //          headers: headers2,
  //         reportProgress: true //this will give us percentage of file uploaded
  //       });

  //   this.http.request(req).subscribe(
  //     (res: any) => {

  //       if(res.type === HttpEventType.UploadProgress){
  //         console.log("-----------------------------------------------");
  //         console.log(res);
  //         file.uploadedPercent = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
  //         // Remember, reportProgress: true  (res.loaded and res.total) are returned by it while upload is in progress


  //         console.log(file.uploadedPercent);
  //         if(file.uploadedPercent >= 100){
  //           file.uploadCompleted = true;
  //         }
  //       }else{
  //         if(file.uploadedPercent >= 100){
  //           file.uploadCompleted = true;
  //           this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1);
  //         }
  //       }
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }
}