import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatRow, MatRowDef  } from '@angular/material/table';
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
  constructor(private userService: UserService){}
  
  ngOnInit() {
    this.fetchUsers();
  }
  fetchUsers(){
    this.userService.getUsers().subscribe(users => {
      console.log(users.users)
      this.users = users.users; 
    }, error => {
      console.error(error)
    })
  }
}
