import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatRow, MatRowDef  } from '@angular/material/table';
import { SnotifyService } from 'ng-snotify';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users = [];
  displayedColumns: string[] = ['id', 'Name', 'Lastname', 'ROL'];
  dataSource = new MatTableDataSource<any>();
  constructor(private userService: UserService, private notificationsService: NotificationsService, private snotify: SnotifyService ){}
  
  ngOnInit() {
    this.fetchUsers();
  }
  fetchUsers(){
    this.userService.getUsers().subscribe(users => {
      this.users = users.users; 
    }, error => {
      console.error(error)
    })
  }
  deleteAccount(id, event: Event){
    event.preventDefault;
    this.snotify.confirm('This action is unresible', 'Are you sure ?', {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes',
         action: (toast) => {
          this.userService.deleteAccountById(id).subscribe(user => {
            this.notificationsService.success('Success', 'The user was deleted')
            this.fetchUsers();
            this.snotify.remove(toast.id);
          }, error => {
            this.notificationsService.error('Error', 'Jmmm some error ocurrs deleting the user')
          })
         },
        bold: false
        },
        {text: 'No', action: (toast) => {console.log('Clicked: No'); this.snotify.remove(toast.id); }, bold: true},
        {text: 'Close', action: (toast) => {console.log('Clicked: No'); this.snotify.remove(toast.id); }, bold: true},
      ]
    });
  }
}
