import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    gold_rate22kk : any ;
    gold_rate18kk:any;
    silver_rate:any;
    loading = false;
    loadingBtn = false;


    role: any = `${localStorage.getItem('role_name')}`;
    roleId: any = `${localStorage.getItem('role_id')}`;
    userName = `${localStorage.getItem('user_name')}`;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.getgoldlist();

    }
    getgoldlist(){
        this.loading = true;
        this.apiService.getData('getLastGoldRate').subscribe((data) => {
           const value = data.data;
          this.gold_rate22kk = value[0].gold_rate22kk;
          this.gold_rate18kk = value[0].gold_rate18kk;
          this.silver_rate = value[0].silver_rate;         
    
          console.log(this.gold_rate22kk);
          this.loading = false;
        }, error => {
            this.loading = false;
        });
      }

    logout() {
        this.router.navigate(['']);
        this.apiService.getData('userLogout').subscribe((data) => {
            localStorage.clear();
            location.reload();
            console.log(data);
        });
    }


}
