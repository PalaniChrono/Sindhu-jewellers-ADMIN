import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    settingList:any = [];
    deliveryCharge:any;
    cgst:any;
    sgst:any;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.getSettings();
    }

    getSettings() {
        this.apiService.getData('getSettings').subscribe((data) => {
            this.settingList = data.data;
            console.log(this.settingList);
            this.deliveryCharge = this.settingList.delivery_charge;
            this.cgst = this.settingList.cgst_tax;
            this.sgst = this.settingList.sgst_tax;
        });
    }

    setSettings() {
        const value = {
            delivery_charge : this.deliveryCharge,
            cgst_tax : this.cgst,
            sgst_tax : this.sgst,
        };
        this.apiService.postData(value, 'setSettings').subscribe((data) => {
            if(!data.error) {
                this.toastr.success(data.message);
                this.getSettings();
            }
        });
    }
}
