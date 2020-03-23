import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CounterService } from 'src/app/_services/counter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter-add',
  templateUrl: './counter-add.component.html',
  styleUrls: ['./counter-add.component.css']
})
export class CounterAddComponent implements OnInit {
  addCounter: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private counterService: CounterService) { }

  ngOnInit() {
    this.addCounter = this.formBuilder.group({
      name: ['', Validators.required],
      letter: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addCounter.invalid) {
      return;
    }

    this.loading = true;
    this.counterService.addCounter(this.addCounter.value)
      .then(
        data => {
          this.router.navigate(['/counter/list']);
        },
        error => {
          this.loading = false;
        });
  }
}
