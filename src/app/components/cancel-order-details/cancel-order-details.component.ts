import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-cancel-order-details',
  templateUrl: './cancel-order-details.component.html',
  styleUrls: ['./cancel-order-details.component.css']
})
export class CancelOrderDetailsComponent implements OnInit {

  searchField: FormControl = new FormControl();
  orderDetails: any = [];
  p = 1;
  imageURL;
  loading: boolean;
  constructor(private apiService: ApiService, private toastr: ToastrService,
              private route: ActivatedRoute,
              private imageService: ImageService) { }

  ngOnInit() {
    this.getOrderDetails();
    this.imageURL = this.imageService.getMinImageurl();
  }

  getOrderDetails() {
    this.loading = true;
    this.apiService.getData('getOrderDetails', this.route.snapshot.paramMap.get('id')).subscribe((data) => {
      this.orderDetails = data.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  goBack() {
    window.history.back();
  }



}
