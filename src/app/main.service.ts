import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url ="https://dashboard-api-cghtsncoaq-ew.a.run.app/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  

  //Get Dashboard Data : All Time
  getDashData(){

    const model ={

      start_date : "2021-06-13",
      end_date : "2021-8-19",
      
    }

    return this.http.post(this.url+"get_admin_dashboard?", model)
  }

  //Get Dashboard Data : By Filter
  getDashDatabyFilterDate(start: string, end: string){
    const model ={

      start_date : start,
      end_date : end,      
    }

   

    return this.http.post(this.url+"get_admin_dashboard?", model)
  }


}
