import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public isLoading = false;

  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' }
  ];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
        country: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    this.isLoading = true;
    const { email, password, name, address } = this.registerForm.value;
    // this.authService.signUp(email, password, name, address).subscribe(
    //   () => {
    //     this.isLoading = false;
    //     this.router.navigate(['/']);
    //   },
    //   (errorMessage: string) => {
    //     this.isLoading = false;
    //     // handle error message
    //   }
    // );
  }
}
