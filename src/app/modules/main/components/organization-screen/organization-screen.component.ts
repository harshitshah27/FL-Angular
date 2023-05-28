import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthService } from 'src/app/services/auth.service';

function ValidateWabaNumber(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const value = control.value.toString();
    if (value.length == 10) { return null }
    if (value.length == 12) {
      if (value.startsWith('91')) { return null }
      return { 'phoneNumberInvalid': true };
    }
    if (value.length !== 10 || value.length !== 12) {
      return { 'numberLimitIssue': true }
    }
  }
  return null;
}

@Component({
  selector: 'app-organization-screen',
  templateUrl: './organization-screen.component.html',
  styleUrls: ['./organization-screen.component.scss']
})
export class OrganizationScreenComponent implements OnInit {

  imageFile: any;
  orgId: any = 1;
  orgForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    closureMessageTemplateID: ['', [Validators.required, Validators.maxLength(100)]],
    wabaNumber: ['', [Validators.required, ValidateWabaNumber]]
  })
  fileError = false;
  imageUrl: string | any = 'http://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder.png'

  questionnaireList = [
    { id: 1, fieldName: 'Device ID', localKey: 'deviceID', foreignKey: '', selectedById: -1 },
    { id: 2, fieldName: 'Product', localKey: 'product', foreignKey: '', selectedById: -1 },
    { id: 3, fieldName: 'Street', localKey: 'primaryStreet', foreignKey: '', selectedById: -1 },
    { id: 4, fieldName: 'City', localKey: 'userSelectedPrimaryCity', foreignKey: '', selectedById: -1 },
    { id: 5, fieldName: 'State/Province', localKey: 'userSelectedPrimaryState', foreignKey: '', selectedById: -1 },
    { id: 6, fieldName: 'Zip/Postal Code', localKey: 'primaryZipCode', foreignKey: '', selectedById: -1 },
    { id: 7, fieldName: 'Existing Meter Name', localKey: 'existingMeterName', foreignKey: '', selectedById: -1 },
    { id: 8, fieldName: 'Existing Meter Serial No.', localKey: 'existingMeterSrNo', foreignKey: '', selectedById: -1 },
    { id: 9, fieldName: 'Upgraded Product Name', localKey: 'upgradedProductName', foreignKey: '', selectedById: -1 },
    { id: 10, fieldName: 'Upgraded Meter Serial No.', localKey: 'upgradedMeterSrNo', foreignKey: '', selectedById: -1 },
    { id: 11, fieldName: 'Pharmacy City', localKey: 'userSelectedPharmacyCity', foreignKey: '', selectedById: -1 },
    { id: 12, fieldName: 'Pharmacy State', localKey: 'userSelectedPharmacyState', foreignKey: '', selectedById: -1 },
    { id: 13, fieldName: 'Pharmacy Pincode', localKey: 'pharmacyPinCode', foreignKey: '', selectedById: -1 },
    { id: 14, fieldName: 'Retailer/Pharmacy Name', localKey: 'pharmacyName', foreignKey: '', selectedById: -1 },
    { id: 15, fieldName: 'Registered Customer Name', localKey: 'registeredCustomerName', foreignKey: '', selectedById: -1 },
    { id: 16, fieldName: 'Registered Contact No.', localKey: 'registeredContactNo', foreignKey: '', selectedById: -1 }
  ]

  reversedKeyword = [
    'interactionId',
    'businessNo',
    'contactNo',
    'transScript',
    'customerName',
    'businessName'
  ]

  selectedFormMappingList: any[] = []
  isFormMappingListContainError = false;

  constructor(
    private fb: FormBuilder,
    private dom: DomSanitizer,
    private snackbar: MatSnackBar,
    private apiCallService: ApiCallService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.orgData$.subscribe((res: any) => {
      if (res) {
        this.orgId = res._id;
        this.orgForm.patchValue(res)
        if (res.logo) {
          this.imageUrl = this.dom.bypassSecurityTrustUrl(res.logo)
        }
        this.apiCallService.sendGetRequest(`organisation/form-mapping/${this.orgId}`, {}, true).then((res: any) => {
          if (res.data) {
            if (res.data.formMappingArray) {
              this.updateFormMapping(res.data.formMappingArray)
            }
          }
        });
      }
    })
  }

  submit() {
    if (this.orgForm.invalid || this.fileError) {
      return;
    }
    const orgFormData: FormData = new FormData();
    orgFormData.append('name', this.orgForm.controls['name'].value);
    orgFormData.append('closureMessageTemplateID', this.orgForm.controls['closureMessageTemplateID'].value);
    orgFormData.append('wabaNumber', this.orgForm.controls['wabaNumber'].value);
    orgFormData.append('logo', this.imageFile);
    this.apiCallService.sendPatchRequest(`organisation/${this.orgId}`, orgFormData).then((res: any) => {
      this.authService.orgData$.next(res.data);
      this.snackbar.open(res.message, 'Dismiss', {
        duration: 2000
      })
      // localStorage.removeItem('user-org-data')
    })
  }

  handleFileInput(event: any) {
    if (event && event.target && event.target.files.length > 0) {
      if (event.target.files[0].size > 256000) {
        this.fileError = true;
        this.imageFile = event.target.files[0];
        this.imageUrl = this.dom.bypassSecurityTrustUrl(URL.createObjectURL(this.imageFile))
        return;
      }
      this.fileError = false;
      this.imageFile = event.target.files[0];
      this.imageUrl = this.dom.bypassSecurityTrustUrl(URL.createObjectURL(this.imageFile))
    }
  }

  check(errors: any, type: string) {
    if (errors[type]) {
      return true;
    }
    return false
  }

  addFormMapping() {
    const formObject = {
      id: null,
      fieldName: null,
      localKey: null,
      foreignKey: '',
      errors: { id: false, key: false, sameKey: false, reversedKeywordError: false }
    }
    this.selectedFormMappingList.push(formObject)
  }

  deleteFormMapping(index: number) {
    this.selectedFormMappingList.splice(index, 1)
    this.updateSelectedByInFormMapping();
    this.resetFormError();
  }

  save() {
    this.resetFormError();
    if (this.isFormMappingListContainError) {
      this.snackbar.open("Form contain error", 'Dismiss', {
        duration: 2000
      })
      return;
    }
    this.apiCallService.sendPatchRequest(`organisation/form-mapping/${this.orgId}`, this.selectedFormMappingList).then((res: any) => {
      if (res.data && res.data.formMappingArray) {
        this.updateFormMapping(res.data.formMappingArray)
      }
      this.snackbar.open(res.message, 'Dismiss', {
        duration: 2000
      })
    })
  }

  updateFormMapping(res: any[]) {
    this.selectedFormMappingList = res;
    this.updateSelectedByInFormMapping();
  }

  formFieldSelectionChange(event: any, index: number) {
    this.selectedFormMappingList[index].fieldName = this.questionnaireList[this.selectedFormMappingList[index].id - 1].fieldName;
    this.selectedFormMappingList[index].localKey = this.questionnaireList[this.selectedFormMappingList[index].id - 1].localKey;
    this.updateSelectedByInFormMapping();
  }

  updateSelectedByInFormMapping() {
    this.questionnaireList.forEach((v) => v.selectedById = -1)
    this.selectedFormMappingList.forEach((v, i) => {
      this.questionnaireList[v.id - 1].selectedById = i;
    })
  }

  onFocusOut(index: number, keyId: number) {
    if (keyId === 2) {
      if (!this.selectedFormMappingList[index].foreignKey) {
        this.selectedFormMappingList[index].errors.key = true;
        this.selectedFormMappingList[index].errors.sameKey = false;
        this.selectedFormMappingList[index].errors.reversedKeywordError = false;
        this.isFormMappingListContainError = true;
      } else {
        this.selectedFormMappingList[index].errors.key = false;
        this.isFormMappingListContainError = false;
        let filter = this.selectedFormMappingList.filter((item) => item.foreignKey === this.selectedFormMappingList[index].foreignKey);
        if (filter.length !== 1) {
          this.selectedFormMappingList[index].errors.sameKey = true;
          this.isFormMappingListContainError = true;
        } else {
          this.selectedFormMappingList[index].errors.sameKey = false;
          this.isFormMappingListContainError = false;
        }
        filter = this.reversedKeyword.filter((item) => item === this.selectedFormMappingList[index].foreignKey);
        if (filter.length !== 0) {
          this.selectedFormMappingList[index].errors.reversedKeywordError = true;
          this.isFormMappingListContainError = true;
        } else {
          this.selectedFormMappingList[index].errors.reversedKeywordError = false;
          this.isFormMappingListContainError = false;
        }
      }
    }
    if (keyId === 1) {
      if (!this.selectedFormMappingList[index].id) {
        this.selectedFormMappingList[index].errors.id = true;
        this.isFormMappingListContainError = true;
      } else {
        this.selectedFormMappingList[index].errors.id = false;
        this.isFormMappingListContainError = false;
      }
    }
  }

  resetFormError() {
    this.selectedFormMappingList.forEach((v, i) => {
      this.onFocusOut(i, 1);
      this.onFocusOut(i, 2);
    });
  }
}
