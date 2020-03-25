import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Token } from '../_models/token';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token: Token[];
  totalQueue: number = 0;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {

    this.tokenService.getTokensByPriority().then(token => {
      this.token = token;
      this.totalQueue = this.token.length;
  });

}

}
