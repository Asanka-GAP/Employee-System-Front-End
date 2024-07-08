import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-manage-emp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage-emp.component.html',
  styleUrl: './manage-emp.component.css'
})
export class ManageEmpComponent {

  public employeeObj = {
    firstName:"",
    lastName:"",
    email:"",
    departmentId:"",
    roleId:""
  
  }


addEmployee(){
  fetch("http://localhost:8080/add-employee",{
    method:'POST',
    body: JSON.stringify(this.employeeObj),
    headers:{
      "Content-type":"application/json"
    }
  }).then(res=>res.json())
  .then(data=>{
    console.log(data);
  })
  
}

}
