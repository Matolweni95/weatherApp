import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {

  FormGroup!: FormGroup;

  constructor(private http: ServiceService, private fb: FormBuilder) { 

    this.FormGroup = this.fb.group({
      search: ['', Validators.required], 
      });

  }

  city:any;
  newDate = {};
  data:any = [];
  forcast: any = [];
  getkey: any;
  obj: any;
  dates:any = [];
  setkey: any;

  //time

  date = new Date();
  current_time = this.date.getHours() +":"+this.date.getMinutes()

  //counter for inner loop to get to the dates and temperatures
  counter(i: number) {
    return new Array(i);
  }
  
  //function to search for city
  async searchCity (FormGroup: { value:{ search:any }}){
    this.city = FormGroup.value.search
    this.http.q = this.city;
    this.http.getCitykey().subscribe((response)=> {
    this.data = response;

    //isolate location key to use for next call
    this.getkey = this.data[0].Key;

    //set key in the Apiservice file
    this.http.citykey = this.getkey;
    this.http.getForcast().subscribe((res)=>{

    //push object into arrays 1 for displaying the other for manipulating dates
    this.forcast.push(res)
    this.obj = res;

    //using MomentJS to format dates
    for(let i = 0 ; i < this.obj.DailyForecasts.length; i++){
      var dateObj = new Date(this.obj.DailyForecasts[i].Date)
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('MMMM Do YYYY')
      this.dates.push({Date: momentString})
    }
      
      //inside forcast key create array
      this.forcast[0].Dates = [];

      //populate the dates to new array
      for(let i = 0 ; i < 5; i++){
        this.forcast[0].Dates.push(this.dates[i]);
      }
      console.log(this.forcast);

    })
    
  });

  }

  ngOnInit(): void {
    
  }

}
