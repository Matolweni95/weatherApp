import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  key = environment.apikey
  q:any;
  citykey:any;

  getCitykey(){
    return this.http.get(environment.BaseUrl+ `?apikey=${this.key}` + `&q=${this.q}`)
  }

  getForcast() {
    return this.http.get(environment.forcastUrl + `${this.citykey}` + `?apikey=${this.key}&details=true`)
  }
}
