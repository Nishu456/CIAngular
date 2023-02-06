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

  fetchMissions(pageIndex: number, pageSize: number, filterValues: string = "", orderBy:string = ""){
     return this.http.get(`${this.apiBaseurl}Volunteer/volunteerMission?pageIndex=${pageIndex}&pageSize=${pageSize}&filterValues=${filterValues}&orderBy=${orderBy}`, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => event),
      catchError(error => throwError(error))
      );
  }

  upsertFavMissions(missionId: number){
    return this.http.post(`${this.apiBaseurl}Volunteer/upsertFavMissions`,missionId).pipe(
      map(res => res),
      catchError(error => throwError(error))
      );
    }

    removeFavMissions(missionId: number){
      return this.http.delete(`${this.apiBaseurl}Volunteer/removeFavMissions?missionId=${missionId}`).pipe(
        map(res => res),
        catchError(error => throwError(error))
        );
      }
}
