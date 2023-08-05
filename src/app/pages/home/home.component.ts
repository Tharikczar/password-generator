import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, MatSliderModule, MatCheckboxModule,ClipboardModule,MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  disabled = false;
  max = 20;
  min = 5;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 5;
  form: FormGroup | any;
  PasswordArray: { name: string; checked: boolean; char: string; }[] | any;
  password: any = '';
  constructor() { }
  ngOnInit(): void {
    this.form = new FormGroup({
      upperCase: new FormControl(false),
      lowerCase: new FormControl(false),
      typeNum: new FormControl(false),
      typeSymbol: new FormControl(false),
    })
    this.getData()
  }
  getData() {
    this.PasswordArray = [
      { "name": "upperCase", "checked": false, "char": "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
      { "name": "lowerCase", "checked": false, "char": "abcdefghijklmnopqrstuvwxyz" },
      { "name": "typeNum", "checked": false, "char": "0123456789" },
      { "name": "typeSymbol", "checked": false, "char": "!@#$%^&*" },
    ]
    console.log(this.PasswordArray)
  }
  getFloatLabelValue(): FloatLabelType {
    return 'auto';
  }
  clipboard() {
   
  }
  changeEvent(event: any, type: string) {
    console.log(this.form.value, event, type)
    this.PasswordArray.forEach((element: any) => {
      if (element['name'] == type) {
        element['checked'] = event.checked
      }
    });
    console.log(this.PasswordArray)
    this.password = '';
  }

  onslideInputChange(event:any){
    console.log(event);
    this.form.reset();
    this.password = '';
    this.PasswordArray.forEach((element: any) => {
      element['checked'] = false;                                     /// reset the checked value
                               
    })

  }
  generatePwd() {

    let newPwd = ''; this.password='';
    this.PasswordArray.forEach((element: any) => {
      if (element['checked'] == true) {
        newPwd += element['char'];                         /// concatenate two strings

      }
    })
    // this.password = newPwd
    console.log(this.value, newPwd.length)

    // completed
    // random password starts
    if(newPwd==''){
      newPwd='abcdefghijklmnopqrstuvwxyz'
    }

    for (var i = 0; i < this.value; i++) {
      var randomNumber = Math.floor(Math.random() * newPwd.length);
      this.password += newPwd.substring(randomNumber, randomNumber + 1);
    }

    console.log(this.password)
  }
  reset() {
    this.form.reset();
    this.value = 5;
    this.password = '';
    this.PasswordArray.forEach((element: any) => {
      element['checked'] = false;                                     /// reset the checked value
                               
    })
    console.log(this.PasswordArray)
  }
}
