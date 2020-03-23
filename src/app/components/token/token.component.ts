import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { Customer } from 'src/app/_models/customer';
import { Department } from 'src/app/_models/department';
import { Token } from 'src/app/_models/token';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  id;
  date: Date;
  token: Token;
  constructor(route: ActivatedRoute,
    private tokenService: TokenService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.tokenService.getTokenById(this.id)
      .then(data => {
        console.log(data);
        this.token = data;
        this.tokenService.onDataReady()
      });

  }

}
