import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';;
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod, } from "@angular/http";
@Injectable({
  providedIn: "root",
})
export class GlobalService {
  base_path: string;
  base_path_1: string;
  prescription: any;
  files: any;
  personalDetail: any;
  loader_image: any;
  // public headers: Headers;
  public requestoptions: RequestOptions;
  public res: Response;
  constructor(private httpClient: HttpClient) {


    this.base_path = "http://localhost:3000/"; //local
    // this.base_path = "http://api.dealcars.in/"; //new server
    // this.base_path = "http://192.168.1.44:3000/"; //Demo
    // this.base_path = "http://43.240.66.36:3000/"; //server
    // this.base_path_1 = "http://localhost:5000/"; //Prod

  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer key',
  });

  public base_path_api_1() {
    return this.base_path_1 + "api/";
  }

  public base_path_api_url_1() {
    return this.base_path_1;
  }

  public base_path_api() {
    return this.base_path + "api/v1/";
  }

  public base_path_api_url() {
    return this.base_path;
  }

  // priyanka
  // for get api calls
  getRequest(url: any): Observable<any> {
    return this.httpClient.get(url)
  }

  // for post api calls
  postRequest(url: any, body: any): Observable<any> {
    return this.httpClient
      .post(url, body, {
        headers: this.headers
      })
      .pipe(map(res => {
        return res
      }))
      .pipe(catchError(err => {
        console.log("^^^^^^^^^^^", err)
        return Observable.throw(err);
      }));
  }
  // end

  public PostRequest(url: string, data: any): any {
    if (localStorage.getItem("access_token")) {
      const headers = new HttpHeaders()
        .set("content-type", "application/json")
        .set("Authorization", localStorage.getItem("access_token"));
      return this.httpClient.post<any>(url, data, { headers });
    } else {
      return this.httpClient.post<any>(url, data);
    }
  }

  public GetRequest(url: string): any {
    console.log(url, "............urlGet");
    if (localStorage.getItem("access_token")) {
      const headers = new HttpHeaders()
        .set("content-type", "application/json")
        .set("Authorization", localStorage.getItem("access_token"));
      return this.httpClient.get<any>(url, { headers });
    } else {
      return this.httpClient.get<any>(url);
    }
  }

  public PutRequest(url: string, data: any): any {
    if (localStorage.getItem("access_token")) {
      const headers = new HttpHeaders()
        .set("content-type", "application/json")
        .set("Authorization", localStorage.getItem("access_token"));
      return this.httpClient.put<any>(url, data, { headers });
    } else {
      return this.httpClient.put<any>(url, data);
    }
  }


}
