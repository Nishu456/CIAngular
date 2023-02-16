import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
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

  missionRating(missionId: number, rate: number){
    var body = {
      missionId: missionId,
      rate: rate
    }
    console.log(body);
    
    return this.http.post(`${this.apiBaseurl}Volunteer/missionRating`, body).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  timeMissionList(){
    return this.http.get(`${this.apiBaseurl}Volunteer/timeMissionList`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  goalMissionList(){
    return this.http.get(`${this.apiBaseurl}Volunteer/goalMissionList`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    );
  }

  missionVolunteering(missionId: number){
    return this.http.post(`${this.apiBaseurl}Volunteer/missionVolunteering`, missionId).pipe(
      map(res=>res),
      catchError(error => throwError(error))
    );
  }

  upsertVolunteerTime(timeData:any, timeId?: number){
    if(timeId != undefined){
      return this.http.post(`${this.apiBaseurl}Volunteer/upsertVolunteerTime?timeId=${timeId}`,timeData).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Volunteer/upsertVolunteerTime`,timeData).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }    
  }

  upsertVolunteerGoal(goalData:any, goalId?: number){
    if(goalId != undefined){
      return this.http.post(`${this.apiBaseurl}Volunteer/upsertVolunteerGoal?goalId=${goalId}`,goalData).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
    else{
      return this.http.post(`${this.apiBaseurl}Volunteer/upsertVolunteerGoal`,goalData).pipe(
        map(res => res),
        catchError(error => throwError(error))
      );
    }
  }

  getVolunteerTimeSheet(){
    return this.http.get(`${this.apiBaseurl}Volunteer/volunteerTimesheet`).pipe(
      map(res => res),
      catchError(error => throwError(error))
    )
  }
}
