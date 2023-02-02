import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../Utilities/getAPIUrl';
import { Iuser } from '../Interfaces/ICI';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiBaseurl = environment.apiBaseUrl;
  private refresh = new Subject<void>();
  get Refresh(){
    return this.refresh;
  }

  constructor(private http: HttpClient) { }

  getUserData(id?: number) {    
    if(id != undefined){
      return this.http.get(`${this.apiBaseurl}Admin/getUser?id=${id}`).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.get(`${this.apiBaseurl}Admin/getUser/`).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
      
  }

  getCityData(id?: number) {
    return this.http.get(`${this.apiBaseurl}Admin/getCity?id=${id}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    ); 
  }

  postUserData(data: Iuser, id?: number) {
    if(id != undefined){
      return this.http.post(`${this.apiBaseurl}Admin/postUserData?id=${id}`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Admin/postUserData`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }    
  }

  getAllUserData(){
    return this.http.get(`${this.apiBaseurl}Admin/getUserData`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  deleteUser(id?: number) {
    return this.http.delete(`${this.apiBaseurl}Admin/deleteUser?id=${id}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );    
  }

  getMissionData(id?: number){
    console.log("id",id)
    if(id != undefined){
      return this.http.get(`${this.apiBaseurl}Admin/getMission?id=${id}`).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.get(`${this.apiBaseurl}Admin/getMission/`).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }    
  }

  postMissionData(data:any, id?: number){
    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // } 

    // const httpOptions = {
    //     headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarycaOt1cmqZEoHxPfc'})
    //   }
    if(id != undefined){
      return this.http.post(`${this.apiBaseurl}Admin/postMission?id=${id}`, data).pipe(
        tap(()=>{
          this.Refresh.next();
        }),
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Admin/postMission/`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
  }  

  getAllMissionData(pageIndex: number, pageSize: number, filterValue: string){
    return this.http.get(`${this.apiBaseurl}Admin/getMissionData?pageIndex=${pageIndex}
                    &pageSize=${pageSize}&filterValue=${filterValue}`).pipe(
                    map(res => res),
                    catchError(error => throwError(error))
                  );
  }

  deleteMission(id: number){
    return this.http.delete(`${this.apiBaseurl}Admin/deleteMission?id=${id}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  // uploadImage(data: FormData){
  //   return this.http.post(`${this.apiBaseurl}Admin/uploadImage`, data).pipe(
  //     map(res => res),
  //     catchError(error => throwError(error))
  //   );
  // }

  uploadImage(data: FormData){
    return this.http.post(`${this.apiBaseurl}Admin/uploadImage`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => event),
      catchError(error => throwError(error))
    );
  }

  uploadDoc(data: FormData){
    return this.http.post(`${this.apiBaseurl}Admin/uploadDoc`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => event),
      catchError(error => throwError(error))
    );
  }

  // uploadDoc(data: FormData){
  //   return this.http.post(`${this.apiBaseurl}Admin/uploadDoc`, data).pipe(
  //     map(res => res),
  //     catchError(error => throwError(error))
  //   );
  // }

  uploadFiles(data: FormData){
    return this.http.post(`${this.apiBaseurl}Admin/uploadFiles`, data).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }
  
  getMissionThemes(pageIndex:number, pageSize: number){
    return this.http.get(`${this.apiBaseurl}Admin/getThemes?pageIndex=${pageIndex}&pageSize=${pageSize}`).pipe(
      map(res=> res),
      catchError(error => throwError(error))
    );
  }

  postThemeData(data:any, id?: number){
    if(id != undefined){
      return this.http.post(`${this.apiBaseurl}Admin/postThemes?themeId=${id}`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Admin/postThemes/`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
  }  

  deleteTheme(id: number){
    return this.http.delete(`${this.apiBaseurl}Admin/deleteTheme?themeId=${id}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  getMissionSkills(pageIndex:number, pageSize: number){
    return this.http.get(`${this.apiBaseurl}Admin/getSkills?pageIndex=${pageIndex}&pageSize=${pageSize}`).pipe(
      map(res=> res),
      catchError(error => throwError(error))
    );
  }

  postSkillData(data:any, id?: number){
    if(id != undefined){
      return this.http.post(`${this.apiBaseurl}Admin/postSkills?skillId=${id}`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Admin/postSkills/`, data).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
  }  

  deleteSkill(id: number){
    return this.http.delete(`${this.apiBaseurl}Admin/deleteSkill?skillId=${id}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }
}
