import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    colorList: any = [];
    colorName = '';
    editColorId = '';
    modalBoxName;
    loadingBtn = false;
    colorCode: any = 'black';
    toggle = false;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.index();
        this.search();
    }

    index() {
        this.loading = true;
        this.apiService.index('color').subscribe(data => {
            this.colorList = data.data;
            this.loading = false;
        });
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'color');
    }

    show(id) {
        this.apiService.show('color/' + id).subscribe((data) => {
            const value = data.data;
            this.colorName = value.color_name;
            this.colorCode = value.color_code;
            this.editColorId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'color/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    tagSwitch(id) {
        this.apiCall('getData', 'colorSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchColor', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.colorList = [];
            } else {
                this.colorList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            color_name: this.colorName,
            color_code: this.colorCode,
        } : value;
        console.log(value);
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
        this.colorName = this.editColorId = '';
        this.errorMsg = [];
        this.colorCode = '#000';
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
                this.apiCall('destroy', 'color/' + id);
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

    toggleColorPicker() {
        this.toggle = this.toggle === false ? true : false;
    }
}
