import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

    subCategoryList: any = [];
    modalBoxName;


    keyword = 'name';
    showPopup = false;
    imagepopup = false;
    subCategoryName: any = '';
    subCategoryDesc: any = '';
    categoryId = '';
    categoryName = '';
    tagArray = [];
    tagId = [];
    activeTagsList: any = [];
    activeCategoryList: any = [];
    selectedTags: any = [];
    editCategoryId: any;
    editCategoryName: any = '';
    editSubCategoryId: any = '';
    editSubCategoryName: any = '';
    editSubCategoryDesc: any = '';
    editTagArray: any = [];
    editTagId = [];
    editSelectedTag: any = [];
    loading = false;
    loadingBtn = false;
    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    viewBox = false;
    viewImagePreview = '';
    viewNamePreview = '';
    viewImageTags = '';
    showImage = true;
    imageUrl = '';
    viewImageDisc = '';
    p = 1;
    dropdownSettings = {};
    activeTags = [];
    viewTags = '';
    defaultImage = 'assets/images/loader.gif';
    @ViewChild('auto', { static: false }) auto;
    @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
    @ViewChild('dropdownRef', { static: false }) dropdownRef: AngularMultiSelect;
    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService) { }

    ngOnInit() {
        this.index();
        this.search();
        // this.searchSubCategory();
        // this.listAllSubCategories();
        this.getActiveTag();
        this.getActiveCategory();
        this.imageUrl = this.imageService.getMinImageurl();
        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Tags',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
    }

    index() {
        this.loading = true;
        this.apiService.index('subcategory').subscribe(data => {
            this.subCategoryList = data.data;
            this.loading = false;
        });
    }

    store() {
        this.loadingBtn = true;
        this.selectedTags = [];
        this.tagArray.forEach((element) => {
            this.tagId.push(element.id);
        });
        this.selectedTags = this.tagId.toString();
        this.apiCall('store', 'subcategory');
    }

    show(id) {

        this.apiService.show('subcategory/' + id).subscribe((data) => {
            const value = data.data;
            this.editSubCategoryId = value.id;
            this.categoryId = value.category.id;
            this.categoryName = value.category.category_name;
            this.subCategoryName = value.sub_category_name;
            // this.tagArray = value.tags[0].sub_category_tags;
            this.subCategoryDesc = value.sub_category_description;
            console.log(
                this.categoryName,
                this.subCategoryName,
                this.tagArray,
                this.subCategoryDesc,
            ) ;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.selectedTags = [];
        this.tagArray.forEach((element) => {
            this.tagId.push(element.id);
        });
        this.selectedTags = this.tagId.toString();
        this.apiCall('update', 'subcategory/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    subCategorySwitch(id) {
        console.log(id);
        this.apiCall('getData', 'subCategorySwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchSubCategory', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.subCategoryList = [];
            } else {
                this.subCategoryList = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            category_id: this.categoryId,
            sub_category_name: this.subCategoryName,
            sub_category_description: this.subCategoryDesc,
            sub_category_tags: this.selectedTags
        } : value;
        this.apiService[name](url, value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.loadingBtn = false;
                this.popUpClose();
                this.index();
            } else {
                this.toastr.error(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;
            }
        });
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if (type === 'Create') {
                this.store();
            } else if (type === 'Edit') {
                this.update(id);
            }
        }
    }

    swalCall(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiCall('destroy', 'subcategory/' + id);
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe.',
                    'error'
                );
            }
        });
    }

    listAllSubCategories() {
        this.loading = true;
        this.apiService.getData('listAllSubCategories').subscribe(data => {
        this.subCategoryList = data.data;
        this.loading = false;
        }, error => {
        this.loading = false;
        });
    }

    getActiveTag() {
        this.apiService.getData('getActiveTag').subscribe((data) => {
        const tags = data.data;
        for (let i = 0; i < tags.length; i++) {
            this.activeTags.push({ id: tags[i].id, itemName: tags[i].tag_name });
        }
        });
    }

    getActiveCategory() {
        this.apiService.getData('getActiveCategory').subscribe((data) => {
            const categories = data.data;
            for (let i = 0; i < categories.length; i++) {
                this.activeCategoryList.push({ id: categories[i].id, name: categories[i].category_name })
            }
        });
    }

    openModalBox(id = '') {
        if (id) {
            this.modalBoxName = 'Edit';
            this.show(id);
        } else {
            this.modalBoxName = 'Create';
        }
        this.showPopup = true;
    }


    createSubCategory() {
        this.selectedTags = [];
        this.editTagId = [];
        this.loadingBtn = true;
        this.tagArray.forEach((element) => {
            this.tagId.push(element.id);
        });
        this.selectedTags = this.tagId.toString();
        const value = {
            category_id: this.categoryId,
            sub_category_name: this.subCategoryName,
            sub_category_description: this.subCategoryDesc,
            sub_category_tags: this.selectedTags
        };
        console.log(this.tagId);
        this.apiService.postData(value, 'createSubCategory').subscribe(data => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.listAllSubCategories();
            this.popUpClose();
            this.loadingBtn = false;
            this.categoryName = this.subCategoryName = this.subCategoryDesc = this.selectedTags = this.categoryId = '';
            this.tagArray = [];
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
            this.errorMsg = data.data;
            setTimeout(() => {
            this.errorMsg = [];
            }, 3000);
        }
        }, error => {
        this.loadingBtn = false;
        });
    }

    updateSubCategory() {
        this.editSelectedTag = [];
        this.editTagId = [];
        this.loadingBtn = true;
        this.editTagArray.forEach((element) => {
            this.editTagId.push(element.id);
        });
        this.editSelectedTag = this.editTagId.toString();
        const value = {
        category_id: this.editCategoryId,
        sub_category_id: this.editSubCategoryId,
        sub_category_name: this.editSubCategoryName,
        sub_category_description: this.editSubCategoryDesc,
        sub_category_tags: this.editSelectedTag
        };
        this.apiService.postData(value, 'updateSubCategory').subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.popUpClose();
            this.modalBoxName = 'Create Sub-Category';
            this.listAllSubCategories();
            this.loadingBtn = false;
        } else {
            this.toastr.warning(data.message);
            this.loadingBtn = false;
            this.errorMsg = data.data;
            setTimeout(() => {
            this.errorMsg = [];
            }, 3000);
        }
        }, error => {
        this.loadingBtn = false;
        });
    }


    deleteSubCategory(id) {
        Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
        }).then((result) => {
        if (result.value) {
            this.apiService.getData('deleteSubCategory', id).subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.p = 1;
            } else {
                this.toastr.error(data.message);
            }
            this.listAllSubCategories();
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

    activateSubCategory(id) {
        this.apiService.getData('activateSubCategory', id).subscribe(data => {
        if (data.error === false) {
            this.toastr.success(data.message);
        } else {
            this.toastr.error(data.message);
        }
        this.listAllSubCategories();
        });
    }

    deActivateSubCategory(id) {
        this.apiService.getData('deActivateSubCategory', id).subscribe(data => {
        if (data.error === false) {
            this.toastr.success(data.message);
        } else {
            this.toastr.error(data.message);
        }
        this.listAllSubCategories();
        });
    }

    searchSubCategory() {
        this.searchField.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchSubCategory', query)
        ))
        .subscribe((result) => {
            if (this.searchField.value === '') {
            this.listAllSubCategories();
            return false;
            }
            if (result.data.length === 0) {
            this.subCategoryList = [];
            } else {
            this.p = 1;
            this.subCategoryList = result.data;
            }
        });
    }

    viewImage(name, image, desc, tags) {
        this.viewBox = true;
        this.viewNamePreview = name;
        this.viewImagePreview = image;
        this.viewImageDisc = desc;
        this.viewImageTags = tags;
        console.log(this.viewImageTags);
    }
      convertImageUrl(path){
        this.imageUrl = this.apiService.apiImageURL;
        return this.imageUrl+''+path;
    }

    popUpClose() {
        this.showPopup = false;
        this.categoryName = this.subCategoryName = this.subCategoryDesc = this.selectedTags = this.categoryId = '';
        this.errorMsg = [];
        this.viewBox = false;
    }

    dropDownOpen(event: any) {
        this.dropdownRef.openDropdown();
    }

    selectedCategory(event) {
        this.categoryId = event.id;
    }

    editSelectedCategory(event) {
        this.editCategoryId = event.id;
    }

    onItemSelect(item: any) {
        console.log(item);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(this.editSelectedTag);
        this.selectedTags = [];
        this.editSelectedTag = [];
        this.editTagId = [];
        this.editTagArray = [];
    }

    onChangeSearch(val: string) {
        console.log(val);
        if (val === '') {
        this.auto.close();
        return false;
        }
    }

    onFocused(e) {
        this.auto.close();
    }

}
