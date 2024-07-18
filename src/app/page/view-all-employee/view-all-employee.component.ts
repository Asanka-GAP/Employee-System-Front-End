import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-view-all-employee',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,NavComponent],
  templateUrl: './view-all-employee.component.html',
  styleUrl: './view-all-employee.component.css'
})
export class ViewAllEmployeeComponent {

  public employeeObj = {
    id:undefined,
    firstName:"",
    lastName:"",
    email:"",
    departmentId:"",
    roleId:""
  }

  public employeeList:any;

  constructor(private http:HttpClient){
    this.loadEmployeeTable()
  }

  loadEmployeeTable(){
this.http.get("http://localhost:8080/get-all").subscribe(res=>{
  this.employeeList=res;
})
  }

  deleteEmployee(employee:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`http://localhost:8080/delete-emp/${employee.id}`,{responseType:'text'}).subscribe(res=>{
          this.loadEmployeeTable();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          console.log(res);

        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

    updateEmployee(employee:any) {
    Swal.fire({
      title: "Update Details",
      html: `
            <input class="swal2-input" value=${employee.firstName} placeholder="First Name" id="firstName">
            <input class="swal2-input" value=${employee.lastName} placeholder="Last Name" id="lastName">
            <input class="swal2-input" value=${employee.email} placeholder="Email" id="email">
            <select class="swal2-select" aria-label="Default select example" id="department" required>
      <option selected>Department</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <select class="swal2-select" aria-label="Default select example" required id="role">
      <option selected>Role</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
          `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        
        const firstName=document.getElementById("firstName") as HTMLInputElement;
        const lastName=document.getElementById("lastName") as HTMLInputElement;
        const email=document.getElementById("email") as HTMLInputElement;
        const departmentId=document.getElementById("department") as HTMLSelectElement;
        const roleId=document.getElementById("role") as HTMLSelectElement;

        this.employeeObj.id=employee.id;
        this.employeeObj.firstName=firstName.value;
        this.employeeObj.lastName=lastName.value;
        this.employeeObj.email=email.value;
        this.employeeObj.departmentId=departmentId.value;
        this.employeeObj.roleId=roleId.value;
        console.log(firstName.value);
        if (
          this.employeeObj.firstName == "" ||
          this.employeeObj.lastName == "" ||
          this.employeeObj.email == "" ||
          this.employeeObj.departmentId == "Department"||
          this.employeeObj.roleId=="Role"
        ) {
          Swal.fire({
            title: "Something Missing!",
            text: "Opps, something Missing. Please check your registration form",
            icon: "error",
            preConfirm: () => {
              this.updateEmployee(employee);
            },
          });
        } else {
          this.saveEmployee(this.employeeObj)
        }
      },
    });
  }

  saveEmployee(employee:any){
    fetch("http://localhost:8080/update-employee", {
      method: "PUT",
      body: JSON.stringify(employee),
      headers: {
        "Content-type": "application/json",
      },
    });
    Swal.fire({
      title: "Updated!",
      text: "Employee Details Updated!",
      icon: "success",
      preConfirm: () => {
        window.location.reload();
      },
    });
  }
}
