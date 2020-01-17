import { Component, Input } from '@angular/core';

@Component({
    selector: 'resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent {
    @Input() resumen:Array<string>;
}
