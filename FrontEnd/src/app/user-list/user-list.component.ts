import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddEditUserPopupComponent } from '../add-edit-user-popup/add-edit-user-popup.component';
import { CustomToastrService } from '../services/custom-toastr.service';
import { ConfirmPopupService } from '../services/confirm-popup.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: 'md-class',
  };

  userList: Array<any> = [];
  constructor(private userService: UserService, private modalService: NgbModal,
    private toastr: CustomToastrService,
    private confirmPopup: ConfirmPopupService) {

  }

  ngOnInit(): void {
    this.fetchUserList();
  }
  fetchUserList() {
    this.userService.getUserList().subscribe((resp: any) => {
      console.log(resp);
      this.userList = resp;
    })
  }

  onAddNewUser() {
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(AddEditUserPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.userData = null;
    modalRef.componentInstance.title = "Add New User";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchUserList();
    });
  }

  onEditUser(userData: any) {
    this.ngbModalOptions.windowClass = 'app-create-user-popup';
    const modalRef = this.modalService.open(AddEditUserPopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.userData = userData;
    modalRef.componentInstance.title = "Edit New User";
    modalRef.componentInstance.refreshParent.subscribe((resp: any) => {
      this.fetchUserList();
    });
  }

  onDeleteUser(userData: any) {
    console.log(userData);
    let options = {
      title: `Are you sure, you want to <b>delete</b> the user?`,
      confirmLabel: 'Yes',
      declineLabel: 'No',
    };

    this.confirmPopup.confirm(options).then((res: boolean) => {
      if (res) {
        this.userService.deleteUser(userData.id).subscribe((resp: any) => {
          //this.userList.splice(userData, 1);
          this.fetchUserList();
          this.toastr.success("User deleted successfully");
        });
      }
    });

  }

}
