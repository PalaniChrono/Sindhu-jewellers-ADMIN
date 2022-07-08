import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatSliderChange } from '@angular/material/slider';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cancel-orders',
  templateUrl: './cancel-orders.component.html',
  styleUrls: ['./cancel-orders.component.css']
})
export class CancelOrdersComponent implements OnInit {

  loading: boolean;
  searchField: FormControl = new FormControl();
  orderDetails: any = [];
  currentStatus = '';
  sliderClass = -1;
  p = 1;
  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listCancelledOrders();
    this.searchOrder();
  }

  listCancelledOrders() {
    this.loading = true;
    this.apiService.getData('listCancelledOrders').subscribe((data) => {
      this.orderDetails = data.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  searchOrder() {
    this.searchField.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
        this.apiService.searchData('searchOrder', query)
      ))
      .subscribe((result) => {
        if (this.searchField.value === '') {
          this.listCancelledOrders();
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


}
