import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    apiUrl = 'http://cartapi.chronoinfotech.in/';
    // apiUrl = 'http://laravel8.chronoinfotech.in/';
    // apiUrl = 'http://localhost:8000/';

    constructor() { }

    public getImageUrl() {
        return this.apiUrl+'images/';
    }

    public getMinImageurl() {
        return this.apiUrl+'images/min/';
    }

    public b64toBlob(b64Data, contentType, sliceSize = 512) {
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

}
