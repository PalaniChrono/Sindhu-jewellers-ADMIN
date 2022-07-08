import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-promo-codes',
    templateUrl: './promo-codes.component.html',
    styleUrls: ['./promo-codes.component.css']
})
export class PromoCodesComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    promoList: any = [];
    promoCode = '';
    discount: any = '';
    minValue = '';
    editPromoId = '';
    modalBoxName;
    loadingBtn = false;

    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.index();
        this.search();
    }

    index() {
        this.loading = true;
        this.apiService.index('promo').subscribe(data => {
            this.promoList = data.data;
            this.loading = false;
        });
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'promo');
    }

    show(id) {
        this.apiService.show('promo/' + id).subscribe((data) => {
            const value = data.data;
            this.promoCode = value.promo_code;
            this.minValue = value.min_value;
            this.discount = value.discount;
            this.editPromoId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'promo/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    promoSwitch(id) {
        this.apiCall('getData', 'promoSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchPromo', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.promoList = [];
            } else {
                this.promoList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            promo_code: this.promoCode,
            min_value: this.minValue,
            discount: this.discount
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
        this.promoCode = this.discount = this.minValue = this.editPromoId = '';
        this.errorMsg = [];
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if(this.discount !== '' && this.discount > 100) {
                this.toastr.error('Discount Should below to 100');
                return false;
            }
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
                this.apiCall('destroy', 'promo/' + id);
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
