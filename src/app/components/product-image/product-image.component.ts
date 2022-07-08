import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ImageService } from 'src/app/services/image.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-product-image',
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
    productId: any = [];
    imageChangedEvent: any = '';
    croppedImage: any = '';
    currentImage: any = '';
    hoverClass = -1;
    exportImagesList: any = [];
    imageName = '';
    loading: boolean;
    allImageList: any = [];
    public files: NgxFileDropEntry[] = [];
    defaultImage = 'assets/images/imageload.gif';
    imageUrl: any = '';
    existImages = false;
    p = 1;
    loadingBtn: boolean;
    constructor(
        private apiService: ApiService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private imageService: ImageService,
        private imageCompress: NgxImageCompressService,
        private router: Router) { }

    ngOnInit() {
        this.listAllProducts();
        // this.imageUrl = this.imageService.getMinImageurl();
        this.imageUrl = this.apiService.apiImageURL;

    }

    listAllProducts() {
        this.loading = true;
        this.apiService.getData('productDetails', this.route.snapshot.paramMap.get('id')).subscribe(data => {
            this.productId = data.data[0].id;
            this.allImageList = data.data[0].images;
        }, error => {
            this.loading = false;
        });
    }
    convertImageUrl(path){
        //  alert(path);
          return this.imageUrl+''+path;
    }
    imageResize($url) {
        return $url;
    }

    editImages() {
        this.existImages = true;
    }

    returnImage() {
      this.existImages = false;
    }
    public dropped(files) {
        for (const item of files) {
            this.files.push(item);
        }
        setTimeout(() => {
            const Index = document.querySelector('#selectImage0') as HTMLElement;
            Index.click();
        });
    }

    selectFileImage(files, id) {
        this.loading = true;
        this.imageName = files.name;
        this.croppedImage = [];
        this.hoverClass = id;
        const fileEntry = files;
        fileEntry.file(
            (ev) => {
                this.imageChangedEvent = { target: { files: [ev] } };
            }
        );
    }

    cropImageList(index) {
        this.exportImagesList.push(this.croppedImage);
        this.deleteFile(index);
        console.log(this.exportImagesList);
        this.croppedImage = [];
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }

    deleteFile(index: number) {
        if (this.files.length !== 0) {
            this.files.splice(index, 1);
        }
        setTimeout(() => {
            const Index = document.querySelector('#selectImage0') as HTMLElement;
            if (Index) {
                Index.click();
            }
        });
        this.imageChangedEvent = '';
        this.croppedImage = '';
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        // console.log(event);
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.loading = false;
        // console.log('image-base64', event);
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    imageUpdateProduct(imageFile, index) {
        // alert( this.productId + "ID pass"+index);
        const formData: FormData = new FormData();
        formData.append('product_id', this.productId);
        formData.append('product_image', imageFile);

        this.apiService.postData(formData, 'imageUpdateProduct').subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.listAllProducts();
                this.deleteFile(index);
               this.router.navigate(['/products']);


            } else {
                this.toastr.error(data.message);
            }
            this.loadingBtn = false;
        }, error => {
          this.loadingBtn = false;
        });
        console.table(imageFile)
    }

    b64toBlob(b64Data, contentType, sliceSize = 512) {
        contentType = contentType || '';
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    convertFile(index) {
        // alert(index);
      this.loadingBtn = true;
      this.imageCompress.compressFile(this.croppedImage, -1, 75, 50).then(
        result => {
          console.log(result);
          var ImageURL = result;
          var block = ImageURL.split(';');
          var contentType = block[0].split(':')[1];
          var realData = block[1].split(',')[1];
          var blob = this.b64toBlob(realData, contentType);
          this.imageUpdateProduct(blob, index);
        });

    }

    deleteImageProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.apiService.getData('deleteImageProduct', id).subscribe(data => {
            if (data.error === false) {
              this.toastr.success(data.message);
              this.p = 1;
            } else {
              this.toastr.error(data.message);
            }
            this.listAllProducts();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      });
    }


}
