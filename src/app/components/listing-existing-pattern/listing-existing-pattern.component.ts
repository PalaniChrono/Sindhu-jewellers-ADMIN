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
  selector: 'app-listing-existing-pattern',
  templateUrl: './listing-existing-pattern.component.html',
  styleUrls: ['./listing-existing-pattern.component.css']
})
export class ListingExistingPatternComponent implements OnInit {
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
  productImage:any;
  productName:any;
  gram_type:any;
  productPrice:any;
  metalPureity:any;
    productDiscountPrice: any;
    productPriceTax: any;
    productWastage: any;
    productDiscountPercentage: any;
    productHallmark: any;
    productHallmarkPrice: any;
    productMakingPrice: any;
    productMakingCharge:any
    productSizes: any;
    productTax: any;
    subCategoryId: any;
    productSlug: any;
    categoryId: any;
    productDescription: any;
    productWeight: any;

    categories: any = [];

    sizesList: any = [];
    sizeArray: any = [];
    sizeId: any = [];
    filteredSubCategories:any=[];
    subCategories:any = [];
    productWastagecharge: any;
    customermetalPureity: any;
    size: any;


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
    //    this.getActiveCategory();
    //    this.getActiveSize();
    //    this.getActiveSubCategory();

    
  }

  getbloglist(blog_id) {
    this.apiService.show('getListingExistingPatternById/' + blog_id).subscribe((data) => {
        const value = data.data;

        this.customerName = value[0].customer_name;
        this.CustomerNO = value[0].customer_no; 
        this.productImage = value[0].images[0].product_image;
        this.createDate = value[0].created_at; 
        this.goldWeight = value[0].gold_weight_in_gms;
        this.customermetalPureity = value[0].metal_pureity;
        this.size = value[0].size;

        

        

        this.productName = value[0].products[0].product_name;
        this.gram_type = value[0].products[0].metal_pureity;  
        this.productSizes = value[0].products[0].product_sizes[0].itemName; 
        this.productDescription = value[0].products[0].product_description; 
        this.productWeight = value[0].products[0].product_weight;    
        this.subCategoryId = value[0].products[0].sub_category_id;  
        this.categoryId = value[0].products[0].category_id;    
        this.productSlug = value[0].products[0].product_slug;   

        

        if( this.gram_type == 'gold18kk'){
            this.productPrice = value[0].products[0].product_price[0].cart_18;
            this.productPriceTax = value[0].products[0].product_price[0].cart_18_tax;  
            this.productWastage = value[0].products[0].product_wastage_price[0].cart_18;
            this.metalPureity = 'Gold 18 KK';
        }
        else if ( this.gram_type == 'gold22kk'){
            this.productPrice = value[0].products[0].product_price[0].cart_22; 
            this.productPriceTax = value[0].products[0].product_price[0].cart_22_tax;  
            this.productWastage = value[0].products[0].product_wastage_price[0].cart_22;
            this.metalPureity = 'Gold 22 KK';
        }else if( this.gram_type == 'silver'){
            this.productPrice = value[0].products[0].product_price[0].silver_rate; 
            this.productPriceTax = value[0].products[0].product_price[0].silver_rate_tax; 
            this.productWastage = value[0].products[0].product_wastage_price[0].silver_rate;
            this.metalPureity = 'Silver';
        }
        this.productDiscountPrice = value[0].products[0].product_discount_price;
        this.productDiscountPercentage = value[0].products[0].product_discount_percentage;
        this.productHallmark = value[0].products[0].product_hallmark;
        this.productHallmarkPrice = value[0].products[0].product_hallmark_price;
        this.productMakingPrice = value[0].products[0].product_making_price;
        this.productMakingCharge = value[0].products[0].product_makingcharge;
        this.productTax = value[0].products[0].tax;   
        this.productWastagecharge = value[0].products[0].product_wastage;   



    });
  }

  getActiveSize() {
    this.sizesList = [];
    this.loading = true;
    this.apiService.getData('getActiveSize').subscribe(data => {
        const sizes = data.data;
        for (const size of sizes) {
            this.sizesList.push({ id: size.id, itemName: size.size_name });
        }
    });
   }
   getActiveCategory() {
    this.categories = [];
    this.loading = true;
    this.apiService.getData('getActiveCategory').subscribe(data => {
        const categories = data.data;
        for (const category of categories) {
            this.categories.push({ id: category.id, name: category.category_name });
        }
        console.log("category list",this.categories);
    });
}

  getActiveSubCategory() {
    this.loading = true;
    this.apiService.getData('getActiveSubCategory').subscribe(data => {
      this.subCategories = data.data;
      console.log("sub-categories Active list",this.subCategories);
      
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




    index() {
        this.loading = true;
        this.apiService.index('partynewpattern').subscribe(data => {
            this.newPatternCustomerList = data.data;
            this.loading = false;
        });
    }
    convertImageUrl(path){
      //  alert(path);
        return this.imageUrl+''+path;
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'partynewpattern');
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


    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchUpdatePartyNewPattern', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.newPatternCustomerList = [];
            } else {
                this.newPatternCustomerList = result.data;
            }
        });
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

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if (type === 'Create') {
                this.store();
            } else if (type === 'Edit') {
                // this.update(id);
            }
        }
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

    viewImage(image ) {
        this.viewBox = true;
        this.viewImagePreview = image;

    }

    imageResize($url) {
        return $url;
    }

}

