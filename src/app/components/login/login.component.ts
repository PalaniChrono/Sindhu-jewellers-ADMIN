import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    forgotpassword = false;
    newpwd = false;
    loading: boolean;
    userName: any;
    password: any;
    usertype: any = 'user';
    userNamePwd:any = '';
    userOTPPwd:any = '';
    newPassword:any = '';
    newConfirmPassword:any = '';
    sendotp = false;
    showOtpBox = false;
    constructor(private route: Router, private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        localStorage.clear();
    }

    userType(type) {
        this.usertype = type;
    }

    login() {
        this.loading = true;
        if (this.userName && this.password) {
            const value = { user_name: this.userName, password: this.password};
            this.apiService.postData(value, 'loginUser').subscribe(data => {
                if (data.error === false) {
                    this.toastr.success(data.message);
                    localStorage.setItem('user_name', data.data.user_name);
                    localStorage.setItem('user_token', data.data.token);
                    localStorage.setItem('user_id', data.data.id);
                    localStorage.setItem('role_name', 'Admin');
                    this.loading = false;
                    console.log('login success');
                    this.route.navigate(['golddashboard']);
                } else {
                    this.toastr.error(data.message);
                    this.loading = false;
                }
            }, (error) => {
                this.toastr.error('Something went wrong try after some time.');
                this.loading = false;
            });
        } else {
            this.toastr.error('Fill the Madatory Params to Proceed');
            setTimeout(() => {
                this.loading = false;
            }, 200);
        }
    }

    showForgotPassword(type) {
        this.forgotpassword = type;
    }

    adminForgotPassword() {
        if(!this.userNamePwd) {
            this.toastr.warning('Enter UserName To Continue');
        } else {
            this.sendotp = true;
            this.apiService.getData('adminForgotPassword', this.userNamePwd).subscribe((data)=> {
                if(!data.error) {
                    this.toastr.success(data.message);
                    this.sendotp = false;
                    this.showOtpBox = true;
                } else {
                    this.toastr.warning(data.message);
                }
            });
        }
    }

    checkPasswordChangeOTP() {
        if(this.userOTPPwd) {
            const value = `${this.userNamePwd}/${this.userOTPPwd}`;
            this.apiService.getData('checkPasswordChangeOTP', value).subscribe((data) => {
                if(data.data) {
                    this.toastr.success(data.message);
                    this.forgotpassword = false;
                    this.newpwd = true;
                } else {
                    this.toastr.warning(data.message);
                }
            });
        } else {
            this.toastr.warning('Enter OTP to continue');
        }
    }

    changePassword() {
        if(this.newPassword && this.newConfirmPassword) {
            if(this.newPassword === this.newConfirmPassword) {
                const value = `${this.userNamePwd}/${this.newPassword}`;
                this.apiService.getData('changePassword', value).subscribe((data) => {
                    if(!data.error) {
                        this.toastr.success(data.message);
                        this.forgotpassword = this.newpwd = false;
                    }
                });
            } else {
                this.toastr.warning('Password Does Not Match');
            }
           
        } else {
            this.toastr.warning('Missing Mandatory Fields');
        }
    }

    showlogin() {
        this.forgotpassword = this.newpwd = false;
    }
}
