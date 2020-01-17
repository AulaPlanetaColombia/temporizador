import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';

@Component({
    selector: 'temporizador',
    templateUrl: './temporizador.component.html',
    styleUrls: ['./temporizador.component.scss']
})
export class TemporizadorComponent implements OnInit, OnChanges {
    @Input() tiempo:number;
    @Input() numero:number;
    @Output() final = new EventEmitter<any>();
    sec:any;
    minutos:string;
    segundos:string;
    paso:number = 0;
    conteo:number;
    crono:Boolean;
    constructor(private tiempoFuera:MatSnackBar) {}
    ngOnInit() {
        this.conteo = this.tiempo;
        this.calculaTiempo();
    }
    ngOnChanges(changes:SimpleChanges) {
        this.conteo = this.tiempo;
        this.calculaTiempo();
    }
    calculaTiempo() {
        if (this.tiempo === 0) {
            this.crono = true;
        }
        this.minutos = this.dosDigitos(Math.floor(Math.abs(this.conteo) / 60));
        this.segundos = this.dosDigitos(Math.abs(this.conteo) - (Number(this.minutos) * 60));
        this.final.emit({'num':this.numero, 'final':Math.abs(this.tiempo - this.conteo)});
    }
    inicia() {
        this.paso = 1;
        const fuente = timer(0,1000);
        this.sec = fuente.subscribe(mil => {
            if (this.conteo === 0 && !this.crono) {
                this.tiempoFuera.open('¡Tiempo fuera! ⏰','Cerrar',{duration:5000});
            }
            this.calculaTiempo();
            this.crono ? this.conteo++ : this.conteo--;
        });
    }
    pausa() {
        this.sec.unsubscribe();
        this.paso = 2;
    }
    restablece() {
        this.sec.unsubscribe();
        this.conteo = this.tiempo;
        this.calculaTiempo();
        this.paso = 0;
    }
    dosDigitos(num:number) {
        if (num < 10) {
            return '0' + String(num);
        } else {
            return String(num);
        }
    }
}
