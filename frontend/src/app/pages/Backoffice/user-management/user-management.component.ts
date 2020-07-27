import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { NewsletterService } from '../../../services/newsletter.service';
import { User } from '../../../models/user';
import { Newsletter } from '../../../models/newsletter';
import { ObjectID } from 'bson';

declare const M: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [
    UserService,
    AuthService
  ]
})
export class UserManagementComponent implements OnInit {

  public noData = true;

  constructor(public userService: UserService, private authService: AuthService, private newsletterService: NewsletterService) { }

  ngOnInit(): void {

    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var date = new Date(year - 18, month, day);

      var elems = document.querySelectorAll('.datepicker');
      var options = {
        autoClose: true,
        format: "dd/mm/yyyy",
        //defaultDate: date,
        //setDefaultDate: true,
        //minDate: date
      }
      var instances = M.Datepicker.init(elems, options);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    this.getUsers();

  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res as User[];

      if(this.userService.users.length > 0){
        this.noData = false;
      }else{
        this.noData = true;
      }
    });
  }

  addUser(form): void{

    let _idUser = new ObjectID().toString();
    let birthday = (<HTMLInputElement> document.getElementById("birthdayAdd")).value;
    let user = new User(_idUser, form.value.name, form.value.email, form.value.password, form.value.role, birthday, form.value.notifications);

    //console.log(user);
    this.userService.addUser(user).subscribe( res => {

      this.authService.saveUser(user).subscribe( res => {

        if(form.value.notifications){

          let _idSubscriber = new ObjectID().toString();
          let newSubscriber = new Newsletter(_idSubscriber, form.value.email);
  
          this.newsletterService.addSubscriber(newSubscriber).subscribe( res => {

            console.log("Registered completed with all");
            this.clearForm(form);
            M.toast({html: "Usuario creado y registrado"});
            //window.location.reload();
            
          }, err => {
            M.toast({html: "Error al suscribir el correo."});
            console.log("Error al suscribir el correo: ", err);
          });

        }else{
          window.location.reload();
        }

      }, err => {
        M.toast({html: "Error al registrar usuario."});
        console.log("Error al registrar usuario.");
      });

    }, ( err => {
      M.toast({html: "Error al crear el usuario."});
      console.log("Error al crear el usuario.");
    }));

  }

  viewUserDetails(form, user: User) {
    //this.userService.selectedUser = user;
    this.setFormValues(form, user);

    //Poner valor del select de rol
    (<HTMLInputElement>document.querySelector('#roleDetail')).value = user.role.toString();

    this.refreshRoleSelect();
  }

  editUser(form, user: User) {
    this.setFormValues(form, user);

    //Poner valor del select de rol
    (<HTMLInputElement>document.querySelector('#roleEdit')).value = user.role.toString();

    this.refreshRoleSelect();
  }

  updateUser(form) {

    console.log(form.value);
    /*this.userService.updateUser(form.value).subscribe( res => {

      this.clearForm(form);
        M.toast({html: "Usuario actualizado"});
        this.getUsers();
      
    }, ( err => {
      console.log("Error al actualizar los datos del usuario.");
    }));*/

  }

  showDeleteUserConfirmation(id: string, name: string) {
    (<HTMLInputElement>document.querySelector('#userID')).value = id;
    (<HTMLInputElement>document.querySelector('#userNameDelete')).innerText = name;
    document.getElementById("deleteUserAction").click();
  }

  deleteUser() {

    let userId = (<HTMLInputElement>document.querySelector('#userID')).value;
    this.userService.deleteUser(userId).subscribe( res => {

      M.toast({html: "Usuario borrado"});
      this.getUsers();  

    }, ( err => {
      console.log("Error al borrar el usuario.");
    }));

  }

  clearForm(form) {
    form.resetForm();
    this.userService.selectedUser = new User();
    this.getUsers();
  }

  setFormValues(form, user: User){
    form.resetForm();
    form.setValue({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      birthday: user.birthday,
      notifications: user.newsletter
    });
  }

  refreshRoleSelect(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }

}
