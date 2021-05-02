import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { NotifierService } from 'angular-notifier';
import { RepositoryList } from 'src/app/models/repository';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private readonly notifier: NotifierService;

  isEdit: Boolean = false;
  loginUser: any;
  user: any;
  isSpiner: Boolean = false;
  repositories: any;
  imgUrl = 'http://localhost:8000/media/picture/'
  constructor(private userService: UserService, notifier: NotifierService, private repositoryService: RepositoryService, private activatedRoute: ActivatedRoute) {
    this.loginUser = JSON.parse(localStorage.getItem('user'))
    this.notifier = notifier;
    this.repositories = null;
    this.user = null;
  }

  ngOnInit(): void {
    localStorage.removeItem("project")
    this.activatedRoute.params.subscribe(res => {
      this._getUser(res['id']);
    })
  }

  update() {
    this.userService.updateUserData(this.user)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.notifier.notify('success', 'Update is successifull.')
          this.isEdit = false
          this._updateData();
        } else {
          this.notifier.notify('warning', 'Update is not finish!')
        }
      })
  }

  _getUser(id: any) {
    this.userService.getUserById(id)
      .subscribe(res => {
        if (res['message'] === 'SUCCESS') {
          this.user = res['data']
          this._getAllRepository();
        }
      })
  }

  _getAllRepository() {
    this.repositories = [];
    this.repositoryService.getAllRepository(this.user.id)
      .subscribe(res => {
        if (res['status'] === 'SUCCESS') {
          res['data'].forEach(element => {
            this.repositories.push(new RepositoryList(element))
          });
        } else {
          this.notifier.notify('warning', 'Server not found!')
        }
      })
  }

  _updateData() {
    localStorage.removeItem('user');

    localStorage.setItem('user', JSON.stringify(this.user))
  }

  _getOwner(data: any) {
    if (data.role.roleName === 'C') {
      return 'User is developer.'
    } else if (data.role.roleName === 'O') {
      return 'User is owner.'
    } else {
      return 'User is viewer.'
    }
  }
}
