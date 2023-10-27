import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
const namepattern ="[a-zA-Z]+";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})

export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup
  education :String [] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate'
  ]
  constructor(private _fb:FormBuilder,private empService:EmployeeService,private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private _coreService:CoreService){
    this.empForm = this._fb.group({
    firstName : ['',[Validators.required,Validators.pattern(namepattern)]],
    lastName : ['',[Validators.required,Validators.pattern(namepattern)]],
    email:['',[Validators.required,Validators.email]],
    dateofbirth:'',
    gender : '',
    company: ['',[Validators.required]],
    experience:['',[Validators.required]],
    package:['',[Validators.required]],
    education:''
    })
  }
  ngOnInit(): void {
   this.empForm.patchValue(this.data)
   console.log(this.empForm)
  }
  onFormSubmit(){
    if(this.empForm.valid){

      if(this.data){
        this.empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next : (val:any) =>{
            this._coreService.openSnackBar("Employee updated","Ok")
            this._dialogRef.close(true);
          },
          error: (err:any) =>{
              console.log(err)
          }
         })
      }
      else{
        this.empService.addEmployee(this.empForm.value).subscribe({
          next : (val:any) =>{
            this._coreService.openSnackBar("Employee added","Ok")
            this._dialogRef.close(true);
          },
          error: (err:any) =>{
              console.log(err)
          }
         })
      }


    }
  }
}
