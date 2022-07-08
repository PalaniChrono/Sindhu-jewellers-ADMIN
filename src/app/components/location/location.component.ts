import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

    searchField: FormControl = new FormControl();
    citySNO = 1;
    stateSNO = 1;
    keyword = 'name';
    stateId = '';
    stateName = '';
    activeStateList = [];
    stateList = [];
    cityId = [];
    cityName = [];
    activeCityList = [];
    cityList = [];
    showStatePopup = false;
    showFeePopup = false;
    showState = false;
    loadingBtn = false;
    loading = false;
    dropdownSettings = {};
    locationList:any = [];
    @ViewChild('autoState', { static: false }) autoState;
    @ViewChild('autoCity', { static: false }) dropdownRef: AngularMultiSelect;

    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.getDeliveryLocation();
        this.getStates();
        this.getActiveStates();
        this.search();
        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Region',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
    }

    openModalBox(type, id = '') {
        if(type === 'set-location') {
            this.showStatePopup = true;
        } else if(type === 'set-fees') {
            this.showFeePopup = true;
        }
    }

    getStates() {
        this.apiService.getData('getStates').subscribe((data) => {
            const state = data.data;
            for (let i = 0; i < state.length; i++) {
                this.activeStateList.push({ id: state[i].id, name: state[i].name })
            }
        });
    }

    getActiveStates() {
        
    }

    getCityOfState() {
        this.apiService.getData('getCityOfState', this.stateId).subscribe((data) => {
            const city = data.data;
            for (let i = 0; i < city.length; i++) {
                this.activeCityList.push({ id: city[i].id, itemName: city[i].city_name })
            }
            this.showState = true;
        });
    }

    getDeliveryLocation() {
        this.apiService.getData('getDeliveryLocation').subscribe((data) => {
            this.locationList = data.data;
            this.stateList = this.locationList.state;
            this.cityList = this.locationList.city;
        });
    }

    updateDeliveryLocation() {
        this.loadingBtn = true;
        this.cityName.forEach((element) => {
            this.cityId.push(element.id);
        });
        const values = {
            state_id : this.stateId,
            city_id : this.cityId
        }
        this.apiService.postData(values, 'updateDeliveryLocation').subscribe((data) => {
            if(data.error === false) {
                this.loadingBtn = false;
                this.toastr.success(data.message);
                this.getDeliveryLocation();
                this.popUpClose();
            }
        });
    }

    removeDeliveryState(id) {
        this.apiService.getData('removeDeliveryState', id).subscribe((data) => {
            if(!data.error) {
                this.toastr.success(data.message);
                this.getDeliveryLocation();
            } else {
                this.toastr.warning(data.message);
            }
        });
    }

    removeDeliveryCity(id) {
        this.apiService.getData('removeDeliveryCity', id).subscribe((data) => {
            if(!data.error) {
                this.toastr.success(data.message);
                this.getDeliveryLocation();
            } else {
                this.toastr.warning(data.message);
            }
        });
    }

    selected(event) {
        this.stateId = event.id;
        this.getCityOfState();
    }

    onChangeSearch(val: string) {
        if (val === '') {
            this.autoState.close();
            return false;
        }
    }

    onFocused(e) {
        this.autoState.close();
    }

    popUpClose() {
        this.showStatePopup = this.showState = false;
        this.stateId = this.stateName = '';
        this.cityId = this.cityName = [];
    }

    dropDownOpen(event: any) {
        this.dropdownRef.openDropdown();
    }

    onDeSelectAll(event) {

    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchLocation', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.getDeliveryLocation();
                return false;
            }
            if (result.data.length === 0) {
                this.cityList = [];
            } else {
                this.cityList = result.data;

            }
        });
    }

}
