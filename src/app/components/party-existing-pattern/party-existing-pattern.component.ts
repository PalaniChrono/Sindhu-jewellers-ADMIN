import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-party-existing-pattern',
  templateUrl: './party-existing-pattern.component.html',
  styleUrls: ['./party-existing-pattern.component.css']
})
export class PartyExistingPatternComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    newPatternCustomerList: any = [];
    categoryName = '';
    categoryDescription = '';
    editCategoryId = '';
    modalBoxName;
    loadingBtn = false;
    viewBox = false;
    viewImagePreview = '';
    viewNamePreview = '';
    showImage = true;
    imageUrl = '';
    viewImageWeight = '';
    viewMobile: any;
    defaultImage = 'assets/images/loader.gif';
    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService) { }

    ngOnInit() {
        this.index();
        this.search();
        this.imageUrl = this.apiService.apiImageURL;

      //  this.imageUrl = this.imageService.getMinImageurl();
    }

    index() {
        this.loading = true;
        this.apiService.index('partyexistingpattern').subscribe(data => {
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
        this.apiCall('store', 'partyexistingpattern');
    }

    show(id) {
        this.apiService.show('category/' + id).subscribe((data) => {
            const value = data.data;
            this.categoryName = value.category_name;
            this.categoryDescription = value.category_description;
            this.editCategoryId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'partyexistingpattern/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    categorySwitch(id) {
        this.apiCall('getData', 'PartyExistingPatternSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchUpdatePartyExistingPattern', query)
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

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            category_name: this.categoryName,
            category_description: this.categoryDescription,
        } : value;
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
                this.update(id);
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
                this.apiCall('destroy', 'partyexistingpattern/' + id);
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

    viewImage(name, no, weight, image ) {
        this.viewBox = true;
        this.viewNamePreview = name;
        this.viewMobile = no;
        this.viewImagePreview = image;
        this.viewImageWeight = weight;
    }

    imageResize($url) {
        return $url;
    }

}
