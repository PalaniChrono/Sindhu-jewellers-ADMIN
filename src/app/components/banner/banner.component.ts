import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    bannerList: any = [];
    bannerName = '';
    editBannerId = '';
    modalBoxName;
    loadingBtn = false;
    viewBox = false;
    viewImagePreview = '';
    viewNamePreview = '';
    showImage = true;
    imageUrl = '';
    viewImageDisc = '';
    defaultImage = 'assets/images/loader.gif';
    

    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService) { }

    ngOnInit() {
        this.imageUrl = this.apiService.apiImageURL;
        this.index();
    }

    index() {
        this.loading = true;
        this.apiService.index('banner').subscribe(data => {
            this.bannerList = data.data;
            this.loading = false;
        });
    }
    convertImageUrl(path){
        return this.imageUrl+''+path;
    }

    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'banner');
    }

    show(id) {
        this.apiService.show('banner/' + id).subscribe((data) => {
            const value = data.data;
            this.bannerName = value.banner_name;
            this.editBannerId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'banner/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    bannerSwitch(id) {
        this.apiCall('getData', 'bannerSwitch/' + id);
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            banner_name: this.bannerName,
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
        this.bannerName  = this.editBannerId = '';
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
                this.apiCall('destroy', 'banner/' + id);
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
}
