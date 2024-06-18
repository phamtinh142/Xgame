import * as $ from 'jquery';
import 'bootstrap';
import { LoginDto, SignupDto } from './dto/auth.dto';
import axios, { ResponseError, ResponseSuccess } from './providers/axios.provider';
import {
  $btnCloseLoginPopup,
  $btnCloseSignupPopup,
  $btnLogin,
  $btnShowLoginPopup,
  $btnShowSignupPopup,
  $btnSignup,
  $inputConfirmPassword,
  $inputEmail,
  $inputEmailLogin,
  $inputPassword,
  $inputPasswordLogin,
  $inputUsername,
  $notifySignup,
  $popupLogin,
  $popupSignup,
  $txtShowLoginPopup,
  $txtShowSignupPopup,
} from './selectors/auth.selector';

class Auth {
  constructor() {
    this.handlePopupAuth();
    this.login();
    this.signup();
  }

  handlePopupAuth() {
    $(document).on('click', $btnShowLoginPopup, () => {
      this.showLoginPopup();
    });

    $(document).on('click', $btnShowSignupPopup, () => {
      this.showSignupPopup();
    });

    $(document).on('click', $txtShowLoginPopup, () => {
      this.showLoginPopup();
    });

    $(document).on('click', $txtShowSignupPopup, () => {
      this.showSignupPopup();
    });

    $(document).on('click', $btnCloseLoginPopup, () => {
      $($popupLogin).modal('toggle');
    });

    $(document).on('click', $btnCloseSignupPopup, () => {
      $($popupSignup).modal('toggle');
    });
  }

  showLoginPopup() {
    $($popupSignup).modal('hide');
    $($popupLogin).modal('show');
    $($notifySignup).html('');
  }

  showSignupPopup() {
    $($popupLogin).modal('hide');
    $($popupSignup).modal('show');
    $($notifySignup).html('');
  }

  login() {
    $(document).on('click', $btnLogin, () => {
      const data = {
        email: $($inputEmailLogin).val() as string,
        password: $($inputPasswordLogin).val() as string,
      } as LoginDto;

      axios
        .post('/auth/login', data)
        .then((res: any) => {
          const { data } = res as ResponseSuccess;

          window.location.href = data.redirect;
        })
        .catch(() => {
          const err = 'Email or password is incorrect';
          this.notifyError(err);
        });
    });
  }

  signup() {
    $(document).on('click', $btnSignup, () => {
      const data = {
        email: $($inputEmail).val() as string,
        username: $($inputUsername).val() as string,
        password: $($inputPassword).val() as string,
        confirmPassword: $($inputConfirmPassword).val() as string,
      } as SignupDto;

      axios
        .post('/auth/signup', data)
        .then(() => {
          const message = `
          Account created successful. Please click <a class="switch-login" href="javascript:void(0)" style="color: #f99910">HERE</a> to login.
        `;

          this.notifySuccess(message);
        })
        .catch((err: ResponseError) => {
          this.notifyError(err.error || err.errors);
        });
    });
  }

  private notifyError(error: string | string[]) {
    let content = '';

    if (error instanceof Array) {
      error.forEach((err) => {
        content += `<strong>- ${err}</strong></br>`;
      });
    } else {
      content = `<strong>${error}</strong></br>`;
    }

    const html = `
    <div class="alert alert-danger fade in">
      <a href="javascript:void()" class="close" data-dismiss="alert">
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <div class="content">${content}</div>
    </div>
  `;

    $($notifySignup).html(html);
    $($notifySignup)
      .fadeTo(3000, 500)
      .slideUp(500, () => {
        $($notifySignup).slideUp(500);
      });
  }

  private notifySuccess(message: string) {
    const html = `
    <div class="alert alert-success fade in">
      <a href="javascript:void()" class="close" data-dismiss="alert">
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <div class="content">${message}</div>
    </div>
  `;

    $($notifySignup).html(html);
    $($notifySignup)
      .fadeTo(3000, 500)
      .slideUp(500, () => {
        $($notifySignup).slideUp(500);
      });
  }
}

new Auth();
