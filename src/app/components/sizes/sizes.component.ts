import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-sizes',
    templateUrl: './sizes.component.html',
    styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    sizeList:any = [];
    sizeName = '';
    editSizeId = '';
    modalBoxName;
    loadingBtn = false;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
      this.index();
      this.search();
    }


    index() {
        this.loading = true;
        this.apiService.index('size').subscribe(data => {
            this.sizeList = data.data;
            this.loading = false;
        });
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'size');
    }

    show(id) {
        this.apiService.show('size/' + id).subscribe((data) => {
            const value = data.data;
            this.sizeName = value.size_name;
            this.editSizeId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'size/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    sizeSwitch(id) {
        this.apiCall('getData', 'sizeSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchSize', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.sizeList = [];
            } else {
                this.sizeList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            size_name: this.sizeName,
        } : value;
        this.apiService[name](url, value).subscribe((data) => {
            console.log(data.error);
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
        this.sizeName = this.editSizeId = '';
        this.errorMsg = [];
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
                this.apiCall('destroy', 'size/' + id);
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
