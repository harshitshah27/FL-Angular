
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

export interface RiderObject {
  firstname: string;
  lastname: string;
  streetaddress: string;
  city: string;
  state: string;
  zip: number;
  latitude: string,
  longitude: string
}

export interface RideObject {
  name?: string;
  startPoint?: string;
  destinationPoint?: string;
  selectedDate?: string;
  selectedTime?: string;
  roundTripStartPoint?: string;
  roundTripDestinationPoint?: string;
  roundTripSelectedDate?: string;
  roundTripSelectedTime?: string;
  riders?: RiderObject[];
  busCount?: number | string;
  busCapacity?: number | string;
  busAdvanceDetails?: boolean;
  optimiseText?: string;
  maxStops?: number | string;
}
export const DISPLAYED_COLUMNS = ['firstname', 'lastname', 'streetaddress', 'city', 'state', 'zip', 'latitude', 'longitude'];
@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss'],
})
export class CreateRideComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  options: string[] = ["a", "b"];
  uploadedFile: any = {};
  pickupControl = new FormControl();
  destControl = new FormControl();
  roundTripPickupControl = new FormControl();
  roundTripDestControl = new FormControl();
  radioSelection = new FormControl();
  pickupRoundtripToggleValue: boolean = false;
  isUploadedFileValid: boolean = true;
  displayedColumns: String[] = DISPLAYED_COLUMNS;
  showExcelTable: boolean = false;
  editExcelTable:boolean = false;


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  dataObject: RideObject = {};

  ridersArray: RiderObject[] = [{
    firstname: "",
    lastname: "",
    streetaddress: "",
    city: "",
    state: "",
    zip: 1111,
    latitude: "",
    longitude: ""
  }];
  dataSource = new MatTableDataSource(this.ridersArray);
  radioColor: ThemePalette = "primary";

  selectedTime: string = "";
  selectedDate: Date = new Date();

  isPreview: boolean = false;

  constructor(public router: Router,) { }

  ngOnInit(): void {
    this.radioSelection.setValue('1');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  saveAsDraftAction(): void {
    this.dataObject.startPoint = this.pickupControl.value;
    this.dataObject.destinationPoint = this.destControl.value;
    this.dataObject.roundTripStartPoint = this.roundTripPickupControl.value;
    this.dataObject.roundTripDestinationPoint = this.roundTripDestControl.value;
    this.dataObject.riders = this.dataSource.data;
    console.log(this.dataObject);
  }

  createNewRide(): void {

  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onToggleChange = (event: any) => {
    this.dataObject.busAdvanceDetails = event.checked
  }

  onFileChange(pFileList: File[]){
    this.uploadedFile = pFileList[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e: any) => {
      this.isUploadedFileValid = true
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      jsonData[0].forEach((headerName: string) => {
        if (!this.displayedColumns.includes(headerName.replace(" ","").toLocaleLowerCase())){
          this.isUploadedFileValid = false
          this.uploadedFile = {}
        }
      })
      if(this.isUploadedFileValid){
        const ridersArray: any[] = [];
        jsonData.slice(1).forEach((row: string[]) => {
          const ridersObj: {[key: string]: string} = {};
          jsonData[0].forEach((headerName: string, index: number) => {
            const headerKey = headerName.replace(" ","").toLocaleLowerCase()
            ridersObj[headerKey] = row[index];
          })
          ridersArray.push(ridersObj)
        })
        this.displayedColumns.push("action")
        this.dataSource = new MatTableDataSource(ridersArray);
      }
       // Do something with the JSON data
    };

    fileReader.readAsArrayBuffer(this.uploadedFile);
  }

  onRadioChange = () => {
    this.uploadedFile = {};
    this.showExcelTable = false;
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.dataSource = new MatTableDataSource([{
      firstname: "",
      lastname: "",
      streetaddress: "",
      city: "",
      state: "",
      zip: 1111,
      latitude: "",
      longitude: ""
    }]);
  }

  onFileInputChange(event: any) {
    this.onFileChange(event.target.files)
  }

  removeExcelUploadedRow = (index: number) => {
    const dataArray = this.dataSource.data;
    dataArray.splice(index, 1)
    this.dataSource =  new MatTableDataSource([...dataArray])
  }

  onUploadClick = () => {
    this.showExcelTable = true
    console.log(this.dataSource)
  }

  addNewRider() {
    this.ridersArray.push({
      firstname: "",
      lastname: "",
      streetaddress: "",
      city: "",
      state: "",
      zip: 1111,
      latitude: "",
      longitude: ""
    });
    this.dataSource = new MatTableDataSource(this.ridersArray);
  }

  togglePickupRoundTripDetails(event: any) {
    this.pickupRoundtripToggleValue = event.source.checked;
  }

  clearAndReupload =() => {
    this.showExcelTable = false;
    this.uploadedFile = {};
  }

  showPreview() {
    this.isPreview = !this.isPreview;
  }

}
