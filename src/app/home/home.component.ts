import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ClientModel } from './home.module';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
formValue !: FormGroup;
ClientModelObj : ClientModel = new ClientModel();
clientData !:any;
showAdd !: boolean;
showUpdate !:boolean;
  constructor(private  formbuilder:FormBuilder,
    private api:ApiService){ }

ngOnInit(): void {
  this.formValue=this.formbuilder.group({
    firstName:[''],
    lastName :[''],
    email:[''],
    phone:[''],
    state:[''],
    country:[''],
    address:[''],
     })
     this.getAllClient();
}
clickAddClient(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate = false;
}
postClientDetails(){
  this.ClientModelObj.firstName= this.formValue.value.firstName;
  this.ClientModelObj.lastName= this.formValue.value.lastName;
  this.ClientModelObj.email= this.formValue.value.email;
  this.ClientModelObj.phone= this.formValue.value.phone;
  this.ClientModelObj.state= this.formValue.value.state;
  this.ClientModelObj.country= this.formValue.value.country;
  this.ClientModelObj.address= this.formValue.value.address;

  this.api.postClient(this.ClientModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Client Added Successfully")
  },
  err=>{
    alert("Something went Wrong");
  })
 
}
getAllClient(){
  this.api.getClient(0)
  .subscribe(res=>{
    this.clientData= res;
  })
}
deleteClient(row:any){
  this.api.deleteClient(row.id)
  .subscribe(res=>{
    alert("Client Deleted")
  })
}
onEdit(row: any){
  this.showAdd=true;
  this.showUpdate = false;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['phone'].setValue(row.phone);
  this.formValue.controls['state'].setValue(row.state);
  this.formValue.controls['country'].setValue(row.country);
  this.formValue.controls['address'].setValue(row.address);
}
updateClientDetails(){
this.ClientModelObj.firstName = this.formValue.value.firstName;
this.ClientModelObj.lastName = this.formValue.value.lastName;
this.ClientModelObj.email = this.formValue.value.email;
this.ClientModelObj.phone = this.formValue.value.phone;
this.ClientModelObj.state = this.formValue.value.state;
this.ClientModelObj.country = this.formValue.value.country;
this.ClientModelObj.address = this.formValue.value.address;
this.api.updateClient(this.ClientModelObj,)
.subscribe(res=>{
  alert("Updated Successfully");
})
}
}
