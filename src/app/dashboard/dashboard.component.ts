import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms'
import { MainService } from '../main.service';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToastService, ModalDirective, IMyOptions  } from 'ng-uikit-pro-standard';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dateRange', { static: false })
  dateRange!: ModalDirective;

  @ViewChild('chartModal', { static: false })
  chartModal!: ModalDirective;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  myDatePickerOptions: IMyOptions = {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading = false;


  /*** Data varibales ***/ 
  completed_bookings= 0;
  upcoming_bookings= 0;
  total_revenue= 0;
  total_bookings= 0;

 
  //Booking Table
  booking_table: Array<any> = [];

  constructor(private service: MainService, private toastr : ToastService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.loading = true;
    this.service.getDashData().subscribe
    ((data:any)=>{

        this.loading = false

        
        //Bookings Overview data
        this.completed_bookings = data.result.completed_bookings
        this.total_bookings = data.result.total_number_of_bookings
        this.total_revenue = data.result.total_revenue
        this.upcoming_bookings = data.result.upcoming_bookings

        setTimeout(() => {
        this.booking_table = data.result.booking_table;
        this.dtTrigger.next();
        }, 1000);

      },
      (error:any)=>{

        this.loading = false;
        this.toastr.error(error.error.error.message)
      }
    );

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void{

    this.dtTrigger.unsubscribe();

  }

  dateRangeForm = new FormGroup({
    StartDate : new FormControl('', [Validators.minLength(1)]),
    EndDate : new FormControl('', [Validators.minLength(1)])

  })

  filterVenueForm = new FormGroup({

    Venues : new FormControl('')
  })

  openModal(){

    this.dateRange.show();
  }

  closeModal(){

    this.dateRange.hide();

    //Reset Form
    this.dateRangeForm.patchValue({

      StartDate: "",
      EndDate: ""
    })
  }

  
  //Get All-Time Dashboard Data
  getAllData(){

    this.loading = true;
    this.service.getDashData().subscribe
    ((data:any)=>{

        this.loading = false

        
        //Bookings Overview data
        this.completed_bookings = data.result.completed_bookings
        this.total_bookings = data.result.total_number_of_bookings
        this.total_revenue = data.result.total_revenue
        this.upcoming_bookings = data.result.upcoming_bookings

      
        setTimeout(() => {
        this.booking_table = data.result.booking_table;
        this.dtTrigger.next();
        }, 1000);

      },
      (error:any)=>{

        this.loading = false;
        this.toastr.error(error.error.error.message)
      }
    );


  }

  filterByDate(){

    this.loading = true;
    this.service.getDashDatabyFilterDate(this.dateRangeForm.value.StartDate, this.dateRangeForm.value.EndDate).subscribe
    ((data: any)=>{

      this.loading = false
      this.closeModal();
      //Bookings Overview data
      this.completed_bookings = data.result.completed_bookings
      this.total_bookings = data.result.total_number_of_bookings
      this.total_revenue = data.result.total_revenue
      this.upcoming_bookings = data.result.upcoming_bookings

      setTimeout(() => {
        this.booking_table = data.result.booking_table;
        this.rerender();
      }, 1000);


      console.log(data)
    },
      (error:any)=>{

        this.loading = false
        this.toastr.error(error.error.error.message)
        console.log(error)
      }

    );  


  }


  //Filter by Venue and City
  filterByVenue(){

    /* this.loading = true
    this.service.getDashDatabyFilterVenue(this.filterVenueForm.value.Venues).subscribe
    ((data:any)=>{

      this.loading = false
      //Bookings Overview data
      this.completed_bookings = data.result.completed_bookings
      this.total_bookings = data.result.total_number_of_bookings
      this.total_revenue = data.result.total_revenue
      this.upcoming_bookings = data.result.upcoming_bookings

      //Bookings per City Data
      this.bookings_per_city =[
        {data: data.result.percentage_of_bookings_per_city_dataset.data, label:"Percentage of bookings per city"}
      ] 
      this.bookings_per_city_labels = data.result.percentage_of_bookings_per_city_labels;
      this.generateColors(this.bookings_per_city_labels);

      //Bookings per Venue Data
      this.bookings_per_venue =[
        {data: data.result.percentage_of_bookings_per_venue_dataset.data, label:"Percentage of bookings per venue"}
      ] 
      this.bookings_per_venue_labels = data.result.percentage_of_bookings_per_venue_labels;
      this.generateColors(this.bookings_per_venue_labels);

      //Revenue per Day Data
      this.revenue_per_day = [
        {data: data.result.revenue_per_day_linechart_dataset.data, label:data.result.revenue_per_day_linechart_dataset.label}
      ]
      this.revenue_per_day_labels = data.result.revenue_per_day_linechart_labels
    },
      (error:any)=>{

        this.loading = false
        this.toastr.error(error.error.error.message)
        console.log(error)
      }
    ) */

    console.log(this.filterVenueForm.value.Venues);
  }

  //Rereender Data-table
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  
}
