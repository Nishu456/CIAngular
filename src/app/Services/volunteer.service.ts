import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../Utilities/getAPIUrl';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiBaseurl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // fetchMissions(pageIndex: number, pageSize: number, searchGrid: string[]){
  //   if(searchGrid.length > 0){
  //     return this.http.get(`${this.apiBaseurl}Volunteer/volunteerMission?pageIndex=${pageIndex}&pageSize=${pageSize}&filterValues=${JSON.stringify(searchGrid)}`).pipe(
  //     map(res => res),
  //     catchError(error => throwError(error))
  //     );
  //   }
  //   else{
  //     return this.http.get(`${this.apiBaseurl}Volunteer/volunteerMission?pageIndex=${pageIndex}&pageSize=${pageSize}`
  //      ).pipe(
  //     map(res => res),
  //     catchError(error => throwError(error))
  //     );
  //   }    
  // }

  fetchMissions(pageIndex: number, pageSize: number, filterValues: string = ""){
     return this.http.get(`${this.apiBaseurl}Volunteer/volunteerMission?pageIndex=${pageIndex}&pageSize=${pageSize}&filterValues=${filterValues}`).pipe(
      map(res => res),
      catchError(error => throwError(error))
      );
  }
}
