import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'cuerpo',
    templateUrl: './cuerpo.component.html',
    styleUrls: ['./cuerpo.component.scss']
})
export class CuerpoComponent {
    turnos:any;
    //tipoTurno:any = {'afavor': 'A Favor', 'encontra': 'En Contra', 'neutro': ''};
    resumen:Array<any> = [];
    valores:Array<any> = [];
    nuevoTemp:any = {'nombre':'','min':0,'seg':0,'tipoTurno':''};
    constructor(private data:DataService, private dialog:MatDialog) {
        data.get().subscribe(res => {
            this.turnos = res;
            this.generaValores();
        });
    }
    generaValores() {
        this.turnos.forEach((val,i) => {
            let minutos:number = Math.floor(val.tiempo / 60);
            let segundos:number = val.tiempo - (minutos * 60);
            this.valores[i] = {'min':minutos,'seg':segundos};
        });
    }
    tiempoFinal(ev:any) {
        this.generaResumen(ev);
    }
    generaResumen(ev:any) {
        this.resumen[ev.num] = {
            'turno': this.turnos[ev.num].nombre,
            'postura': this.turnos[ev.num].tipoTurno,
            'tiempo':this.convierteTiempo(ev.final)
        };
        this.resumen.forEach((val:any,num:number) => {
            let rowspan:number = 0;
            let visible:Boolean = true;
            if (num > 0 && val.turno === this.resumen[num - 1].turno) {
                visible = false;
            }
            if (visible) {
                let continuo:Boolean = true;
                for (let i:number = num; i < this.resumen.length; i++) {
                    if (continuo && val.turno === this.resumen[i].turno) {
                        rowspan++;
                    } else {
                        continuo = false;
                    }
                }
            }
            this.resumen[num].rowspan = rowspan;
            this.resumen[num].visible = visible;
        });
    }
    convierteTiempo(segs:number) {
        let minutos:number = Math.floor(segs / 60);
        let segundos:number = segs - (minutos * 60);
        return this.dosDigitos(minutos) + ':' + this.dosDigitos(segundos);
    }
    abreModal(modal) {
        this.dialog.open(modal, {panelClass: 'conf-dialog'});
    }
    cierraModal() {
        this.dialog.closeAll();
    }
    suelta(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.turnos, event.previousIndex, event.currentIndex);
    }
    elimina(num:number) {
        this.valores.splice(num,1);
        this.turnos.splice(num,1);
        this.resumen.splice(num,1);
    }
    adiciona() {
        let nuevo:any = {
            'nombre':this.nuevoTemp.nombre,
            'tiempo':(this.nuevoTemp.min * 60) + this.nuevoTemp.seg,
            'tipoTurno':this.nuevoTemp.tipoTurno
        };
        this.turnos.unshift(nuevo);
        this.generaValores();
        this.nuevoTemp = {'nombre':'','min':0,'seg':0,'tipoTurno':''};
        this.cierraModal()
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
