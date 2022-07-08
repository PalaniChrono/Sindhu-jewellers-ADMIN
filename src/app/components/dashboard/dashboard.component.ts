import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  loading: boolean;
  dashboardDetails: any = [];
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.adminDashboard();
  }

  ngAfterViewInit(): void {

  }

  adminDashboard() {
    this.loading = true;
    this.apiService.getData('adminDashboard').subscribe((data) => {
      this.dashboardDetails = data.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


}
