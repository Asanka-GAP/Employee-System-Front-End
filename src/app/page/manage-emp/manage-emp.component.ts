import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-manage-emp',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './manage-emp.component.html',
  styleUrl: './manage-emp.component.css'
})
export class ManageEmpComponent {

  public employeeObj = {
    firstName:"",
    lastName:"",
    email:"",
    department:"",
    role:""
  
  }

  constructor(private http:HttpClient){}

addEmployee(){
  
  this.http.post("http://localhost:8000/emp-controller/add-employee",this.employeeObj).subscribe(
    (data)=>{
      console.log(data);
    }
  )

  
}

}
