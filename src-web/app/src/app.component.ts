import { Component } from '@angular/core';

import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'src.component.html',
    directives: [AlertComponent]
})
export class AppComponent {
}