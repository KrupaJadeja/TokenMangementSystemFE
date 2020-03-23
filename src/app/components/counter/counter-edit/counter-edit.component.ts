import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Counter } from 'src/app/_models/counter';
import { CounterService } from 'src/app/_services/counter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-counter-edit',
  templateUrl: './counter-edit.component.html',
  styleUrls: ['./counter-edit.component.css']
})
export class CounterEditComponent implements OnInit {
  editCounter: FormGroup;
  loading = false;
  submitted = false;
  counter_id: number;
  counter: Counter;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private counterService: CounterService) { }

  ngOnInit() {
    this.counter_id = +this.route.snapshot.paramMap.get('id');
    this.editCounter = this.formBuilder.group({
      name: ['', Validators.required],
      letter: ['', Validators.required]
    });
    this.initForm();
  }

  private initForm() {
    this.counterService.getCounterById(this.counter_id).then(data => {
      if (data != null) {
        this.editCounter = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name, Validators.required),
          'letter': new FormControl(data.letter, Validators.required)
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editCounter.invalid) {
      return;
    }

    this.loading = true;
    this.counterService.editCounter(this.editCounter.value)
      .then(
        data => {
          this.router.navigate(['/counter/list']);
        },
        error => {
          this.loading = false;
        });
  }
}
