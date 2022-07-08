import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    productList: any = [];
    loading = false;
    loadingBtn = false;
    showPopup = false;
    stockBox = false;
    modalBoxName = '';
    keyword = 'name';

    categoryName: any;
    subCategoryName:any;
    productWeight: any;
    productWastage:any;
    productHallmark:any;
    productMakingCharge: any;
    productName: any;
    productPrice: any;
    productDiscPrice: any;
    productTax:any;
    productDesc: any;
    productSize = '';
    productImages: any = [];
    editProductId: any;

    filteredSubCategories:any=[];
    subCategories:any = [];
    subCategorId:any;

    gold_rate22kk : any ;
    gold_rate18kk:any;
    gold_rate24kk:any;
    silver_rate:any;

    gram_type:any;
    metalPureity:any;

    sizesList: any = [];
    sizeArray: any = [];
    sizeId: any = [];
    selectedSize: any = [];
    sizeSettings = {};

    categories: any = [];
    sno = 1;
    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    viewBox = false;
    showImage = true;
    imageUrl = '';
    
    viewproduct:any;
    viewcategory : any;
    viewimage : any;
        viewprize : any;
        viewdisprize : any;
        viewdescription : any;
        viewsizes : any;
        viewgramtype:any;

    productStocks:any = [];
    stockProductName = '';
    stockForm: FormGroup;

    // sizeQuantity:any[] = [];

    defaultImage = 'assets/images/loader.gif';
    @ViewChild('auto', { static: false }) auto;
    @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
    @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
    testimage: any;
    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getgoldlist();
        this.index();
        this.getActiveCategory();
        this.getActiveSize();
        this.getActiveSubCategory();
        this.search();
        this.imageUrl = this.apiService.apiImageURL;
       // this.imageUrl = this.imageService.getMinImageurl();
        this.sizeSettings = {
            singleSelection: false,
            text: 'Select Sizes',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
        this.stockForm = this.formBuilder.group({
            product_id: new FormControl('', Validators.required),
        });
    }
    getgoldlist(){
        this.loading = true;
        this.apiService.getData('getLastGoldRate').subscribe((data) => {
           const value = data.data;
          this.gold_rate22kk = value[0].gold_rate22kk;   
          this.gold_rate18kk = value[0].gold_rate18kk;   
          this.silver_rate = value[0].silver_rate;   
              this.loading = false;
        }, error => {
            this.loading = false;
        });
      }
      convertImageUrl(path){
        this.imageUrl = this.apiService.apiImageURL;
        return this.imageUrl+''+path;
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
      getFilteredSubCategory(id){
        
        if(id != 0){
          this.filteredSubCategories = [];
          console.log("sub-categ Filter",this.subCategories);
          console.log("sub-categ Filter sub",this.filteredSubCategories);
        const subCategories = this.subCategories.filter(p => p.category_id===id)
         for (const subCategory of subCategories) {
                this.filteredSubCategories.push({ id: subCategory.id, name: subCategory.sub_category_name, category_id:subCategory.category_id});
                console.log("subcateg For loop",this.filteredSubCategories);
    
            }
        }
        
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

    index() {
        this.loading = true;
        this.apiService.index('getAllProduct').subscribe(data => {
            this.productList = data.data;
            this.loading = false;
        });
    }

    // index() {
    //     this.loading = true;
    //     this.apiService.index('getAllProduct').subscribe(data => {
    //         this.productList = data.data;
    //         this.loading = false;
    //     });
    // }

    store() {
        this.loadingBtn = true;
        this.sizeId = [];
        this.sizeArray.forEach(element => {
            this.sizeId.push(element.id);
        });
        this.selectedSize = this.sizeId.toString();
        this.apiCall('store', 'product');
    }
    gramType(type) {
        this.gram_type = type;
        if( type == 'gold22kk'){
            this.productPrice = this.gold_rate22kk;
        } else if( type == 'gold18kk'){
            this.productPrice = this.gold_rate18kk;
        }else if( type == 'silver'){
            this.productPrice = this.silver_rate;
        }
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

    show(id) {
        
        this.apiService.show('product/' + id).subscribe((data) => {
            const value = data.data;
            this.editProductId = id;
            this.categoryName = value.category.id;
            this.getFilteredSubCategory(this.categoryName);
            this.subCategoryName = value.sub_category_id; 
            this.sizeArray = value.product_sizes;
            console.log('sizeArray', this.sizeArray);
            this.productTax= value.tax;
            this.productName = value.product_name;
            this.productWeight = value.product_weight;
            this.productWastage = value.product_wastage;
            this.productHallmark = value.product_hallmark;
            this.productMakingCharge = value.product_makingcharge;
            this.productDiscPrice = value.product_discount_price;
            // this.productDiscPrice = value.product_discount_percentage;
            this.productDesc = value.product_description;
            this.testimage = value.images[0].product_image;
            this.productImages = value.images; 
            this.gram_type = value.metal_pureity;
            if( this.gram_type == 'gold22kk'){
                this.productPrice = value.product_price[0].cart_22; 
                this.metalPureity = 'gold22kk';
            } else if( this.gram_type == 'gold18kk'){
                this.productPrice = value.product_price[0].cart_18; 
                this.metalPureity = 'gold18kk';
            }else if( this.gram_type == 'silver'){
                this.productPrice = value.product_price[0].silver_rate; 
                this.metalPureity = 'silver';
            }


        });
    }

    update(id) {
        this.loadingBtn = true;
        this.sizeId = [];
        this.sizeArray.forEach(element => {
            this.sizeId.push(element.id);
        });
        this.selectedSize = this.sizeId.toString();
        this.apiCall('update', 'product/' + id);
        this.popUpClose();

    }

    productSwitch(id) {
        this.apiCall('getData', 'productSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchProduct', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.productList = [];
            } else {
                this.productList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            category_id : this.categoryName,
            sub_category_id:this.subCategoryName,
            product_name: this.productName,
            product_price: this.productPrice,
            product_discount_percentage: this.productDiscPrice,
            product_description: this.productDesc,
            product_weight: this.productWeight,
            product_wastage: this.productWastage,
            product_hallmark: this.productHallmark,
            product_makingcharge: this.productMakingCharge,
            tax:this.productTax,
            metal_pureity: this.gram_type,
            

        }   : value;
        console.log('UPDATE', value);
        if(this.selectedSize.length) {
            value['product_sizes'] = this.selectedSize;
        }
        this.apiService[name](url, value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.loadingBtn = false;
                this.popUpClose();
                this.index();
            } else {
                this.toastr.error(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;
            }
        });
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if (type === 'Create') {
                this.store();
            } else if (type === 'Edit') {
                this.update(id);
            }
        }
    }
    destroy(id) {
        this.swalCall(id);
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
                this.apiCall('destroy', 'product/' + id);
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

    openModalBox(type, id = '', name = '') {
        if(type === 'Edit') {
            this.modalBoxName = type;
            this.show(id);
            this.showPopup = true;
        } else if (type === 'Stocks') {
            this.modalBoxName = type;
            this.stockBox = true;
            this.stockProductName = name;
            this.getStockOfProduct(id);
        } else if (type === 'Create') {
            this.modalBoxName = 'Create';
            this.categoryName = 0;
            this.subCategoryName = 0;
            this.productTax= 1 ;
            this.productName ='';
            this.productPrice ='';
            this.productDiscPrice ='';
            this.productDesc ='';
          //  this.productImages = '';
            this.productWeight = '';
            this.productWastage = '';
            this.productHallmark = '';
            this.productMakingCharge =''; 
            this.metalPureity="";
            this.selectedSize = '';
            this.showPopup = true;
        }
    }

    viewImage(id ,image) {
        // alert(id);
        this.show(id);
       this.viewimage = image;

        this.viewBox = true;
       
    }

    popUpClose() {
        this.showPopup = this.viewBox = this.stockBox = false;
        this.categoryName = '';
        this.subCategoryName = '';
        this.productTax= '' ;
        this.productName ='';
        this.productPrice ='';
        this.productDiscPrice ='';
        this.productDesc ='';
        this.productWeight = '';
        //this.productImages = '';
        this.productWastage = '';
        this.productHallmark = '';
        this.productMakingCharge =''; 
        this.metalPureity="";
        this.errorMsg = this.sizeArray = [];
    }


    openSize(event) {
        this.sizeDropDown.openDropdown();
    }

    onDeSelectAllSizes(event) {
        this.selectedSize = [];
        this.sizeArray = [];
        this.sizeId = [];
    }

    onChangeSearch(val: string) {
        if (val === '') {
            this.auto.close();
            return false;
        }
    }

    onFocused(e) {
        this.auto.close();
    }

    getStockOfProduct(id) {
        this.apiService.getData('getStockOfProduct', id).subscribe(data => {
            this.productStocks = data.data;
            this.productStocks.forEach((stock: any) => {
                this.stockForm.addControl(stock.id, new FormControl('', Validators.required));
                const element = this.stockForm.get(stock.id.toString());
                element.patchValue(stock.stock_quantity);
            });
        });
    }

    updateProductStocks() {
        const value = this.stockForm.value;
        delete value['product_id'];
        this.apiService.postData(value, 'updateProductStocks').subscribe(data => {
            this.toastr.success(data.message);
            this.popUpClose();
        });
    }

    outOfStocks() {
        this.productStocks.forEach((stock: any) => {
            const element = this.stockForm.get(stock.id.toString());
            element.patchValue(0);
        });
        this.updateProductStocks();
    }

}
