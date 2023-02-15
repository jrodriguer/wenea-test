import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, ReplaySubject, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective =
    {} as PlaceholderDirective;

  countries = [
    { name: 'Spain', code: 'SP' },
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' }
  ];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
    const { email, password, name, address } = this.registerForm.value;
    console.log(this.registerForm.value);
    this.authService.signUp(email, password, name, address).then(
      (res) => {
        // this.router.navigate(['/']);
      },
      (err) => this.showErrorAlert(err)
    );
  }

  private showErrorAlert(message: string) {
    console.log(message);
    const alertFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertFactory);

    componentRef.instance.msg = message;
    componentRef.instance.close
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        hostViewContainerRef.clear();
      });
  }
}
