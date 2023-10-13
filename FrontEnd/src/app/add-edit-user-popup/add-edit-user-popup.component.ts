import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { CustomToastrService } from '../services/custom-toastr.service';

@Component({
  selector: 'app-add-edit-user-popup',
  templateUrl: './add-edit-user-popup.component.html',
  styleUrls: ['./add-edit-user-popup.component.css']
})
export class AddEditUserPopupComponent implements OnInit {
  _refresh = new BehaviorSubject<any>({});
  @Output() refreshParent = this._refresh.asObservable();
  @Input() public userData: any;
  @Input() public title: any;

  public saveUserForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, 
    private userService: UserService,private toastr: CustomToastrService) {
    this.saveUserForm = this.formBuilder.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get id() { return this.saveUserForm.get("id"); }
  get firstName() { return this.saveUserForm.get("firstName"); }
  get lastName() { return this.saveUserForm.get("lastName"); }
  get email() { return this.saveUserForm.get("email"); }

  ngOnInit(): void {
    if (this.userData) {
      this.id?.setValue(this.userData.id);
      this.firstName?.setValue(this.userData.firstName);
      this.lastName?.setValue(this.userData.lastName);
      this.email?.setValue(this.userData.email);
    }
  }

  onSaveUser() {
    if (this.saveUserForm.invalid) {
      return;
    }

    let payload = this.saveUserForm.value;
    console.log(payload);
    if (this.userData) {
      this.editUser(payload);
    } else {
      this.addUser(payload);
    }
  }
  addUser(payload: any) {
    this.userService.addNewUser(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
      this.toastr.success("User added succesfully");
    }, (error: any) => {
      this.toastr.error("Failed to add new user");
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }

  editUser(payload: any) {
    this.userService.updateUser(payload).subscribe((resp: any) => {
      this._refresh.next({
        responseCode: "E000",
        responseMessage: "Success"
      });
      this.activeModal.close('Override click');
      this.toastr.success("User updated succesfully");
    }, (error: any) => {
      this.toastr.error("Failed to update user");
      console.log(error);
      this._refresh.next({
        responseCode: "E001",
        responseMessage: "Failed"
      });
      this.activeModal.close('Override click');
    })
  }
}
