import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    p = 1;
    show = false;
    userList: any = [];
    modalBoxName;
    isActive = false;
    isActiveCon = false;
    allBranchlist = [];
    keyword = 'name';
    userName;
    userEmail;
    password;
    conPassword;
    editUserId;
    editUserName;
    editUserEmail;
    editUserPassword;
    loading = false;
    errorMsg: any = [];
    loadingBtn = false;
    searchField: FormControl = new FormControl();
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.listAllUsers();
        this.searchUser();
    }

    listAllUsers() {
        this.loading = true;
        this.apiService.getData('user').subscribe(data => {
            this.userList = data.data;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }
    createUser() {
        
        if(this.userEmail.search("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")){
            this.toastr.error("Enter Valid Email");
             return false;
        }

        this.loadingBtn = true;
        const value = {
            user_name: this.userName,
            user_email: this.userEmail,
            password: this.password,
            c_password: this.conPassword
        };
        console.log(value);
        this.apiService.store('user', value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllUsers();
                this.password = '';
                this.userName = '';
                this.conPassword = '';
                this.popUpClose();
                this.loadingBtn = false;
            } else {
                this.toastr.error(data.message);
                this.errorMsg = data.data;
                console.log(data);
                setTimeout(() => {
                    this.errorMsg = [];
                }, 3500);
                this.loadingBtn = false;
            }
        }, error => {
            this.loadingBtn = false;
        });
    }

    updateUser() {
        if(this.editUserEmail.search("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")){
            this.toastr.error("Enter Valid Email");
             return false;
        }
        else if (!this.editUserName) {
            this.toastr.error('Missing the mandatory params to update');
            return false;
        }
        this.loadingBtn = true;
        const value = {
            id: this.editUserId,
            user_name: this.editUserName,
            user_email : this.editUserEmail,
            password: this.editUserPassword
        };
        this.apiService.update('user/'+ this.editUserId, value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.popUpClose();
                this.modalBoxName = 'Create User';
                this.loadingBtn = false;
            } else {
                this.toastr.warning(data.message);
                this.loadingBtn = false;
            }
            this.listAllUsers();
        }, error => {
            this.loadingBtn = false;
        });
    }

    userSwitch(id) {
        this.apiService.getData('userSwitch', id).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllUsers();
            } else {
                this.toastr.error(data.message);
            }
        });
    }

    searchUser() {
        this.searchField.valueChanges
            .pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
                this.apiService.searchData('searchUser', query)
            ))
            .subscribe((result) => {
                if (this.searchField.value === '') {
                    this.listAllUsers();
                    return false;
                }
                if (result.data.length === 0) {
                    this.userList = '';
                } else {
                    this.userList = result.data;
                }
            });
    }

    passwordVisible() {
        this.isActive = true;
    }

    passwordinVisible() {
        this.isActive = false;
    }

    conPasswordVisible() {
        this.isActiveCon = true;
    }

    conPasswordinVisible() {
        this.isActiveCon = false;
    }

    openModalBox(id = '', name = '', email = '') {
        this.show = true;
        if (name) {
            this.modalBoxName = 'Edit User';
            this.editUserId = id;
            this.editUserName = name;
            this.editUserEmail = email;
            this.editUserPassword = '';
        } else {
            this.modalBoxName = 'Create User';
            this.password = '';
            this.userName = '';
            this.userEmail = '';
            this.conPassword = '';
        }
    }
    popUpClose() {
        this.show = false;
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this User file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiService.destroy('user/'+id).subscribe((data) => {
                    if (data.error === false) {
                        this.toastr.success(data.message);
                        this.listAllUsers();
                    } else {
                        this.toastr.error(data.message);
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your User detail has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your User detail file is safe :)',
                    'error'
                );
            }
        });
    }
}
