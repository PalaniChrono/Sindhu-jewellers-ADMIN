import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-linking-products',
    templateUrl: './linking-products.component.html',
    styleUrls: ['./linking-products.component.css']
})
export class LinkingProductsComponent implements OnInit {

    keyword = 'name';
    loadingBtn = false;
    errorMsg: any = [];
    colorId = '';
    productColor = '';
    productId = '';
    productName = '';
    activeColorlist:any = [];
    activeProductlist:any = [];
    linkProductList: any = [];
    linkId = '';
    @ViewChild('colorauto', { static: false }) colorauto;
    @ViewChild('productauto', { static: false }) productauto;
    // @ViewChild('colorauto', { static: false, read: ElementRef }) colorAuto: ElementRef;

    constructor(
        private apiService: ApiService,
        private toastr: ToastrService,
        private router: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.linkId = this.router.snapshot.paramMap.get('id');
        this.getActiveColor();
        this.getActiveProduct();
        this.listLinkProduct();
    }

    getActiveColor() {
        this.apiService.getData('getActiveColor').subscribe((data) => {
            const color = data.data;
            for (let i = 0; i < color.length; i++) {
                this.activeColorlist.push({ id: color[i].id, name: color[i].color_name })
            }
        });
    }

    getActiveProduct() {
        this.apiService.getData('getActiveProduct').subscribe((data) => {
            const product = data.data;
            for (let i = 0; i < product.length; i++) {
                this.activeProductlist.push({ id: product[i].id, name: product[i].product_name })
            }
        });
    }

    addLinkProduct() {
        this.loadingBtn = true;
        const value = {
            'link_id' : this.linkId,
            'product_id' : this.productId,
            'color_id' : this.colorId
        };
        this.apiService.postData(value ,'addLinkProduct').subscribe((data) => {
            if(!data.error) {
                this.listLinkProduct();
                this.clearAll();
                this.toastr.success(data.message);
            } else {
                this.toastr.warning(data.message);
                this.errorMsg = data.data;
                console.log(this.errorMsg);
            }
            this.loadingBtn = false;
        });
    }

    listLinkProduct() {
        this.apiService.getData('listLinkProduct', this.linkId).subscribe((data) => {
            this.linkProductList = data.data;
        });
    }

    deleteLinkProduct($id) {
        this.apiService.getData('deleteLinkProduct', $id).subscribe((data) => {
            if(!data.error) {
                this.toastr.success(data.message);
                this.listLinkProduct();
            } else {
                this.toastr.warning(data.message);
            }
        });
    }

    clearAll() {
        this.colorId = this.productColor = this.productId = this.productName = '';
    }

    onChangeSearch(val: string) {
        if (val === '') {
            this.colorauto.close();
            this.productauto.close();
            return false;
        }
    }

    onFocused(e) {
        this.colorauto.close();
        this.productauto.close();
    }

    selectedColor(event) {
        this.colorId = event.id;
    }

    selectedProduct(event) {
        this.productId = event.id;
    }
}
