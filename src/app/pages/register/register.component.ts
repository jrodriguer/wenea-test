import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { UserService } from '../../services/user.service';
import { UserDoc } from '../../../models/ddbb.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective =
    {} as PlaceholderDirective;

  provinces = [{ name: 'Madrid', code: 'MD' }];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        zip: ['', [Validators.pattern(/^[0-9]{5}$/)]],
        province: ['']
      })
    });
  }

  onSubmit() {
    const formValue: UserDoc = this.registerForm.value;
    this.authService
      .signUp(
        formValue.email,
        formValue.password,
        formValue.name,
        formValue.address
      )
      .then(
        () => {
          this._setUserDoc(formValue);
        },
        (err) => this.showErrorAlert(err)
      );
  }

  private _setUserDoc(registration: UserDoc) {
    this.userService
      .createUser(registration)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        // this.router.navigate(['/']);
      });
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
