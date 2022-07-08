import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-link-products',
    templateUrl: './link-products.component.html',
    styleUrls: ['./link-products.component.css']
})
export class LinkProductsComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    linkProductList: any = [];
    colorName = '';
    editColorId = '';
    modalBoxName;
    loadingBtn = false;
    colorCode: any = 'black';
    toggle = false;
    constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

    ngOnInit() {
        this.index();
        this.search();
    }

    index() {
        this.loading = true;
        this.apiService.index('linkproduct').subscribe(data => {
            this.linkProductList = data.data;
            this.loading = false;
        });
    }

    destroy(id) {
        this.swalCall(id);
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
                this.linkProductList = [];
            } else {
                this.linkProductList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        this.apiService[name](url, value).subscribe((data) => {
            if (data.error === false) {
                this.index();
            } else {
                this.toastr.error(data.message);
            }
        });
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
                this.apiCall('destroy', 'linkproduct/' + id);
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

    createLink() {
        this.router.navigate(['/linking-products', this.getUniqueId(1)]);
    }

    getUniqueId(parts: number) {
        const stringArr = [];
        for(let i = 0; i< parts; i++){
            const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            stringArr.push(S4);
        }
        return stringArr.join('-');
    }

}
