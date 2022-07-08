import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
    keyword = 'name';
    allHeaderMenu: any = [];
    allCategoryList: any = [];
    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    showpopup: boolean;
    modalBoxName = '';
    loadingBtn: boolean;
    loading: boolean;
    categoryId = '';
    categoryName;
    p = 1;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.getActiveCategory();
        this.listAllHeaderMenu();
    }

    getActiveCategory() {
        this.allCategoryList = [];
        this.loading = true;
        this.apiService.getData('getActiveCategory').subscribe(data => {
            const category = data.data;
            for (let i = 0; i < category.length; i++) {
                this.allCategoryList.push({ id: category[i].category_id, name: category[i].category_name });
            }
            console.log(this.allCategoryList);
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    listAllHeaderMenu() {
        this.apiService.getData('listAllHeaderMenu').subscribe((data) => {
            this.allHeaderMenu = data.data;
        });
    }

    openModalBox(id = '', name = '', desc = '') {
        this.showpopup = true;
        if (id && name) {
            this.modalBoxName = 'Edit Menu';
        } else {
            this.modalBoxName = 'Create Menu';
        }
    }


    createHeaderMenu() {
       if (this.categoryId === '') {
        this.errorMsg = {category_name: 'category field is required'};
        setTimeout(() => {
          this.errorMsg = {};
      }, 3000);
       } else {
        this.loadingBtn = true;
        const value = {
            category_id : this.categoryId
        };

        this.apiService.postData(value, 'createHeaderMenu').subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllHeaderMenu();
                this.popUpClose();
                this.loadingBtn = false;
            } else {
                this.toastr.warning(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;

            }
        }, error => {
            this.loadingBtn = false;
        });
       }
    }

    deleteHeaderMenu(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiService.getData('deleteHeaderMenu', id).subscribe(data => {
                    if (data.error === false) {
                        this.toastr.success(data.message);
                        this.listAllHeaderMenu();
                    } else {
                        this.toastr.error(data.message);
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        });
    }

    activateHeaderMenu(id) {
        this.apiService.getData('activateHeaderMenu', id).subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllHeaderMenu();
            } else {
                this.toastr.error(data.message);
            }
        });
    }

    deActivateHeaderMenu(id) {
        this.apiService.getData('deActivateHeaderMenu', id).subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllHeaderMenu();
            } else {
                this.toastr.error(data.message);
            }
        });
    }

    popUpClose() {
        this.showpopup = false;
    }

    selectedCategory(event) {
        this.categoryId = event.id;
    }
}
