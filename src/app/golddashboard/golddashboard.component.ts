import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
@Component({
  selector: 'app-golddashboard',
  templateUrl: './golddashboard.component.html',
  styleUrls: ['./golddashboard.component.css']
})
export class GolddashboardComponent implements OnInit {

  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  


  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = '';

  productStocks:any = [];
  stockProductName = '';
  stockForm: FormGroup;


  card3_img : any = ""
  card3_iconimg : any = ""
  home_card3_heading : any = ""
  home_card_3_textcontent : any = ""
  // sizeQuantity:any[] = [];

  defaultImage = 'assets/images/loader.gif';

  @ViewChild('auto', { static: false }) auto;
  @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
  /* 
  @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
  @ViewChild('flavourDropDown', { static: false }) flavourDropDown: AngularMultiSelect; */

  homeContent:any="";
  show: boolean = false;

  currentDate = new Date();

  sno = 1;
  goldlist : any = [];
  gold_id:any;
  gold_rate:any;
  gold_rate18kk:any;
  gold_rate22kk:any;
  gold_rate24kk:any;
  silver_rate:any;


  edit_gold_rate18kk:any;
  edit_gold_rate22kk:any;
  edit_gold_rate24kk:any;
  edit_silver_rate:any;

  
  

  editid: any ;
  editHomeID: any = '';
  editName: any = '';
  editDesignation: any = '';
  editQuote: any = '';
  createID :any ;
  createHomeID : any ='';
  createName: any = '';
  createDesignation: any = '';
  createQuote: any = '';
  header:any;



  constructor(
    private apiService: ApiService, 
    private toastr: ToastrService, 
    public router: Router, 
    private imageService: ImageService, 
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
   
    timer(0,1000).subscribe(() => {
      this.currentDate = new Date()
      })

    this.getgoldlist();


  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 46 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  openModalBox(id = '', gold_rate22kk ='', gold_rate18kk ='',silver_rate ='' , type) {
    if (type == 'edit') {
        this.modalBoxName = 'Edit';
         this.gold_id = id;


    }else if (type == 'view') {
      this.modalBoxName = 'View';
       this.gold_id = id;


    } else {
        this.modalBoxName = 'Create';
        this.gold_id = id;
        this.gold_rate22kk ='';
        this.gold_rate18kk ='';
        this.silver_rate = '';

    }
    
    this.showPopup = true;
  }
  popUpClose() {
    this.showPopup = false;
    this.errorMsg = [];
}


getgoldlist(){
    this.loading = true;
    this.apiService.getData('getAllGoldRate').subscribe((data) => {
      // const value = data.data
      this.goldlist = data.data;
      console.log(this.goldlist);
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }
 /*  updategoldrate() {
   
    const value = {

      three_header :this.header,

    };
  
    this.apiCall("update", "updateTestimonyHeader", value);
  } */


  createGoldRate(){

    this.loadingBtn = true;
    const value = { 
      gold_rate22kk: this.gold_rate22kk,
      gold_rate18kk: this.gold_rate18kk,
      silver_rate: this.silver_rate

    }
    this.apiService.postData(value, 'storeGoldRate').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.getgoldlist();
            this.gold_rate22kk ='';
            this.gold_rate18kk ='';
            this.silver_rate = '';
            this.popUpClose();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
        }
    }, error => {
        this.loadingBtn = false;
    });
  }

  
  deleteTestimony(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Testimony Detail',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteTestimonyById', id).subscribe((data) => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    this.getgoldlist();
                } else {
                    this.toastr.error(data.message);
                }
            });
  
            Swal.fire(
                'Deleted!',
                'Your Testimony  detail has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Testimony detail file is safe :)',
                'error'
            );
        }
    });
  }


  apiCall(name, url, value : any = '') {
    this.apiService[name](url, value).subscribe((data) => {
       if (data.error === false) {
          this.toastr.success(data.message);
          this.loadingBtn = false;
        } else {
          this.toastr.error(data.message);
          this.loadingBtn = false;
          this.errorMsg = data.data;     
       }
      this.getgoldlist();
      this.popUpClose();
    });
  }




  closepopup(){
    this.show = false;
  }

  openPopup(){
    this.show = true;
  }
}
