import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { ImageService } from "src/app/services/image.service";
import Swal from "sweetalert2";
import { AngularMultiSelect } from "angular2-multiselect-dropdown";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-listing-new-pattern',
  templateUrl: './listing-new-pattern.component.html',
  styleUrls: ['./listing-new-pattern.component.css']
})
export class ListingNewPatternComponent implements OnInit {
  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = "";
  keyword = "name";
  

  newPatternCustomerList: any = [];
  categoryName = '';
  categoryDescription = '';
  editCategoryId = '';

  viewImagePreview = '';
  imageUrl = '';
 
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;


  defaultImage = "assets/images/loader.gif";
  @ViewChild('tagDropDown', { static: false }) tagDropDown: AngularMultiSelect;
  @ViewChild("auto", { static: false }) auto;
  @ViewChild("auto", { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild("sizeDropDown", { static: false })
  sizeDropDown: AngularMultiSelect;
  @ViewChild("flavourDropDown", { static: false })
  flavourDropDown: AngularMultiSelect;
 

  blog_id:any;
  customerName:any;
  CustomerNO:any;
  goldImage:any;
  goldWeight:any;
  createDate:any;
  topView:any;
  bottomView:any;
  frontView:any;
  backView:any;
  metalPureity: any;
  productType: any;
  topname: string;
  viewtopname: any;
  bottomname: string;
  frontname: string;
  backname: string;



  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.blog_id = +params['id']; 
      });
      if(this.blog_id){
         this.getbloglist(this.blog_id);
       }
       this.imageUrl = this.apiService.apiImageURL;

    
  }

  getbloglist(blog_id) {
    this.apiService.show('getListingNewPatternById/' + blog_id).subscribe((data) => {
        const value = data.data;

        this.customerName = value[0].customer_name;
        this.CustomerNO = value[0].customer_no; 
        this.topView = value[0].top_view; 
        this.bottomView = value[0].bottom_view; 
        this.frontView = value[0].front_view; 
        this.backView = value[0].back_view; 
        this.goldWeight = value[0].gold_weight_in_gms; 
        this.createDate = value[0].created_at; 
        this.metalPureity = value[0].metal_pureity; 
        this.productType = value[0].product_type; 
        this.topname = 'Top View';
        this.bottomname = 'Bottom View';
        this.frontname = 'Front View';
        this.backname = 'Back View';


        
        


    });
  }




  apiCall(name, url, value: any = "") {
    this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.loadingBtn = false;
      } else {
        this.toastr.error(data.message);
        this.loadingBtn = false;
        this.errorMsg = data.data;
      }
      this.getbloglist(this.blog_id);
    });
  }

    convertImageUrl(path){
      //  alert(path);
        return this.imageUrl+''+path;
    }

    show(id) {
        this.apiService.show('category/' + id).subscribe((data) => {
            const value = data.data;
            this.categoryName = value.category_name;
            this.categoryDescription = value.category_description;
            this.editCategoryId = id;
        });
    }

 

    destroy(id) {
        this.swalCall(id);
    }


    openModalBox(id = '') {
        if (id) {
            this.modalBoxName = 'Edit';
            this.show(id);
        } else {
            this.modalBoxName = 'Create';
        }
        this.showPopup = true;
    }

    popUpClose() {
        this.showPopup = false;
        this.categoryName = this.categoryDescription = this.editCategoryId = '';
        this.errorMsg = [];
        this.viewBox = false;
    }

    swalCall(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiCall('destroy', 'partynewpattern/' + id);
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe.',
                    'error'
                );
            }
        });
    }

    viewImage(image,name ) {
        this.viewBox = true;
        this.viewImagePreview = image;
        this.viewtopname = name;

    }

    imageResize($url) {
        return $url;
    }

}

