import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'temporizador',
    templateUrl: './temporizador.component.html',
    styleUrls: ['./temporizador.component.scss']
})
export class TemporizadorComponent {
    horas:number = 0;
    minutos:number = 0;
    segundos:number = 0;
    centesimas:number = 0;
    seg:number = 100;
    hor:number = 3600 * this.seg;
    min:number = 60 * this.seg;
    subs:any;
    paso:number = 0;
    constructor() {}
    inicia() {
        this.paso = 1;
        this.ajusta();
        const time:any = {
            'hor' : this.horas * this.hor,
            'min' : this.minutos * this.min,
            'seg' : this.segundos * this.seg,
        };
        const delta:any = {};
        const fuente = timer(0,(1000 / this.seg));
        let conteo:number = this.centesimas + time.seg + time.min + time.hor;
        this.subs = fuente.subscribe(mil => {
            delta.hor = conteo - time.hor;
            delta.min = delta.hor - time.min;
            delta.seg = delta.min - time.seg;
            this.horas = Math.floor(conteo / this.hor);
            this.minutos = Math.floor(delta.hor / this.min);
            this.segundos = Math.floor(delta.min / this.seg);
            this.centesimas = delta.min - time.seg;
            this.ajusta();
            time.hor = this.horas * this.hor;
            time.min = this.minutos * this.min;
            time.seg = this.segundos * this.seg;
            conteo--;
            if (conteo <= 0) {this.restablece()}
        });
    }
    pausa() {
        this.subs.unsubscribe();
        this.paso = 2;
    }
    restablece() {
        this.subs.unsubscribe();
        this.paso = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.centesimas = 0;
    }
    ajusta() {
        if (this.horas > 99) {this.horas = 99;}
        if (this.horas < 0) {this.horas = 0;}
        if (this.minutos > 59) {this.minutos = 59;}
        if (this.minutos < 0) {this.minutos = 0;}
        if (this.segundos > 59) {this.segundos = 59;}
        if (this.segundos < 0) {this.segundos = 0;}
        if (this.centesimas > this.seg - 1) {this.centesimas = this.seg - 1;}
        if (this.centesimas < 0) {this.centesimas = 0;}
    }
}
