import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'cuerpo',
    templateUrl: './cuerpo.component.html',
    styleUrls: ['./cuerpo.component.scss']
})
export class CuerpoComponent {
    turnos:any;
    tipoTurno:any = {'afavor': 'A Favor', 'encontra': 'En Contra'};
    resumen:Array<any> = [];
    valores:Array<any> = [];
    constructor(private data:DataService, private dialog:MatDialog) {
        data.get().subscribe(res => {
            this.turnos = res;
            this.turnos.forEach((val,i) => {
                let minutos:number = Math.floor(val.tiempo / 60);
                let segundos:number = val.tiempo - (minutos * 60);
                this.valores[i] = {'min':minutos,'seg':segundos};
            });
        });
    }
    tiempoFinal(ev:any) {
        this.resumen[ev.num] = {
            'turno': this.turnos[ev.num].nombre,
            'postura': this.tipoTurno[this.turnos[ev.num].tipoTurno],
            'tiempo':this.convierteTiempo(ev.final)
        };
    }
    convierteTiempo(segs:number) {
        let minutos:number = Math.floor(segs / 60);
        let segundos:number = segs - (minutos * 60);
        return this.dosDigitos(minutos) + ':' + this.dosDigitos(segundos);
    }
    abreModal(modal) {
        this.dialog.open(modal, {maxWidth: '40rem',panelClass: 'conf-dialog'});
    }
    cierraModal() {
        this.dialog.closeAll();
    }
    ajustaTiempo() {
        this.valores.forEach((val,i) => {
            this.turnos[i].tiempo = (val.min * 60) + val.seg;
        });
    }
    dosDigitos(num:number) {
        if (num < 10) {
            return '0' + String(num);
        } else {
            return String(num);
        }
    }
}