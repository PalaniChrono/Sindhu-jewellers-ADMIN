import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatSliderChange } from '@angular/material/slider';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    loading: boolean;
    searchField: FormControl = new FormControl();
    orderDetails: any = [];
    currentStatus = '';
    sliderClass = -1;
    p = 1;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.listAllOrders();
        this.searchOrder();
    }

    listAllOrders() {
        this.loading = true;
        this.apiService.getData('listAllOrders').subscribe((data) => {
            this.orderDetails = data.data;
            this.loading = false;
            }, error => {
            this.loading = false;
        });
    }

    orderStatusUpdate(id) {
        if(this.currentStatus === 'Submitted' || this.currentStatus == '') {
            this.toastr.warning('Status cant be updated to Submitted');
            this.sliderClass = -1;
            return false;
        }
        this.apiService.getData('orderStatusUpdate', `${id}/${this.currentStatus}`).subscribe((data) => {
        if (data.error === false) {
            this.listAllOrders();
            this.toastr.success(data.message);
            this.sliderClass = -1;
        } else {
            this.toastr.error(data.message);
        }
        });
    }

    formatLabel(value: number) {
        if (value === 4) {
            return 'Delivered';
        } else if (value === 3) {
            return 'Shipped';
        } else if (value === 2) {
            return 'Processed';
        } else if (value === 1) {
            return 'Submitted';
        }
        return value;
    }

    onInputChange(event: MatSliderChange) {
        if (event.value === 4) {
            this.currentStatus = 'Delivered';
        } else if (event.value === 3) {
            this.currentStatus = 'Shipped';
        } else if (event.value === 2) {
            this.currentStatus = 'Processed';
        } else if (event.value === 1) {
            this.currentStatus = 'Submitted';
        }
    }

    orderUpdate(index) {
        this.sliderClass = index;
    }

    searchOrder() {
        this.searchField.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchOrder', query)
        ))
        .subscribe((result) => {
            if (this.searchField.value === '') {
                this.listAllOrders();
                return false;
            }
            if (result.data.length === 0) {
                this.orderDetails = '';
            } else {
                this.p = 1;
                this.orderDetails = result.data;
            }
        });
    }

    checkLabelStatus(status) {
        if (status === 'Delivered') {
            return 4;
        } else if (status === 'Shipped') {
            return 3;
        } else if (status === 'Processed') {
            return 2;
        } else if (status === 'Submitted') {
            return 1;
        }
    }

}
