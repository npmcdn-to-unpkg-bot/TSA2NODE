/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { Control, ControlGroup } from '../model';
import { ControlContainer } from './control_container';
import { Form } from './form_interface';
import { NgControl } from './ng_control';
import { NgControlGroup } from './ng_control_group';
export declare const formDirectiveProvider: any;
/**
 * Binds an existing control group to a DOM element.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jqrVirudY8anJxTMUjTP?p=preview))
 *
 * In this example, we bind the control group to the form element, and we bind the login and
 * password controls to the login and password elements.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-src',
 *   template: `
 *     <div>
 *       <h2>NgFormModel Example</h2>
 *       <form [ngFormModel]="loginForm">
 *         <p>Login: <input type="text" ngControl="login"></p>
 *         <p>Password: <input type="password" ngControl="password"></p>
 *       </form>
 *       <p>Value:</p>
 *       <pre>{{value}}</pre>
 *     </div>
 *   `,
 *   directives: [FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginForm: ControlGroup;
 *
 *   constructor() {
 *     this.loginForm = new ControlGroup({
 *       login: new Control(""),
 *       password: new Control("")
 *     });
 *   }
 *
 *   get value(): string {
 *     return JSON.stringify(this.loginForm.value, null, 2);
 *   }
 * }
 *  ```
 *
 * We can also use ngModel to bind a domain model to the form.
 *
 *  ```typescript
 * @Component({
 *      selector: "login-comp",
 *      directives: [FORM_DIRECTIVES],
 *      template: `
 *        <form [ngFormModel]='loginForm'>
 *          Login <input type='text' ngControl='login' [(ngModel)]='credentials.login'>
 *          Password <input type='password' ngControl='password'
 *                          [(ngModel)]='credentials.password'>
 *          <button (click)="onLogin()">Login</button>
 *        </form>`
 *      })
 * class LoginComp {
 *  credentials: {login: string, password: string};
 *  loginForm: ControlGroup;
 *
 *  constructor() {
 *    this.loginForm = new ControlGroup({
 *      login: new Control(""),
 *      password: new Control("")
 *    });
 *  }
 *
 *  onLogin(): void {
 *    // this.credentials.login === 'some login'
 *    // this.credentials.password === 'some password'
 *  }
 * }
 *  ```
 *
 *  @experimental
 */
export declare class NgFormModel extends ControlContainer implements Form, OnChanges {
    private _validators;
    private _asyncValidators;
    private _submitted;
    form: ControlGroup;
    directives: NgControl[];
    ngSubmit: EventEmitter<{}>;
    constructor(_validators: any[], _asyncValidators: any[]);
    private _displayWarning();
    ngOnChanges(changes: SimpleChanges): void;
    submitted: boolean;
    formDirective: Form;
    control: ControlGroup;
    path: string[];
    addControl(dir: NgControl): void;
    getControl(dir: NgControl): Control;
    removeControl(dir: NgControl): void;
    addControlGroup(dir: NgControlGroup): void;
    removeControlGroup(dir: NgControlGroup): void;
    getControlGroup(dir: NgControlGroup): ControlGroup;
    updateModel(dir: NgControl, value: any): void;
    onSubmit(): boolean;
    private _checkFormPresent();
}
