import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName','lastName', 'company', 'dateofbirth','education','email','experience','gender','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog , private _empService :EmployeeService,
    private _coreService:CoreService){  }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  /*For openin Dialog box to add*/
  openAddEditForm(){
    const dialogref = this._dialog.open(EmpAddEditComponent,{
      width:'65%'
    })
    dialogref.afterClosed().subscribe({
      next : (res) =>{
        if(res){
          this.getEmployeeList();
        }
      }
    })
  }
  /*getting employee list value*/
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next : (res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      },
      error : (err) =>{
      console.log(err);
      }
    })
  }
  /*Filter for table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*Deleting Employee */
  deleteEmployee(id:number){
    const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){
    this._empService.deleteEmployee(id).subscribe({
      next : (res) => {

        this._coreService.openSnackBar('Employee Deleted','OK')
        this.getEmployeeList();
      },
      error: (err) =>
      {
        console.log(err)
      }
    })
  }
  })
  }
  /*opening dialog box for editing*/
  openEditForm(data:any){
  const dialogref= this._dialog.open(EmpAddEditComponent,{
    data
   })
   dialogref.afterClosed().subscribe({
    next : (res) =>{
      if(res){
        this.getEmployeeList();
      }
    }
  })
  }
}
