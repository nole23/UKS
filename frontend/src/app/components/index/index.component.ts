import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  imgUrl = 'http://localhost:8000/media/picture/'
  constructor() { }

  ngOnInit(): void {
    console.log(this.imgUrl)
  }

}
