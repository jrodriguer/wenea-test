import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, ReplaySubject, takeUntil } from 'rxjs';

import { AlertComponent } from '../../shared/alert/alert.component';
import { AuthResponseData } from '../../../models/auth-model.temp';
import { AuthService } from '../../auth/auth.service';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective =
    {} as PlaceholderDirective;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const pw = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.authSrv.signIn(email, pw).then(
      (res) => {
        // this.router.navigate(['/']);
      },
      (err) => this.showErrorAlert(err)
    );
  }

  private showErrorAlert(message: string) {
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
