import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'cuerpo',
    templateUrl: './cuerpo.component.html',
    styleUrls: ['./cuerpo.component.scss']
})
export class CuerpoComponent {
    turnos:any/* = [
        {'nombre': 'Exposición Inicial', 'tiempo': 240, 'tipoTurno': 'afavor'}, // 4 minutos
        {'nombre': 'Exposición Inicial', 'tiempo': 240, 'tipoTurno': 'encontra'}, // 4 minutos
        {'nombre': 'Refutación 1', 'tiempo': 300, 'tipoTurno': 'afavor'}, // 5 minutos
        {'nombre': 'Refutación 1', 'tiempo': 300, 'tipoTurno': 'encontra'}, // 5 minutos
        {'nombre': 'Refutación 2', 'tiempo': 300, 'tipoTurno': 'afavor'}, // 5 minutos
        {'nombre': 'Refutación 2', 'tiempo': 300, 'tipoTurno': 'encontra'}, // 5 minutos
        {'nombre': 'Conclusión', 'tiempo': 180, 'tipoTurno': 'encontra'}, // 3 minutos
        {'nombre': 'Conclusión', 'tiempo': 180, 'tipoTurno': 'afavor'} // 3 minutos
    ]*/;
    tipoTurno:any = {'afavor': 'A Favor', 'encontra': 'En Contra'};
    resumen:Array<any> = [];
    constructor(data:DataService) {
        data.get().subscribe(res => this.turnos = res);
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
    abreModal() {
        // Crea diálogo para configurar los tiempos
    }
    dosDigitos(num:number) {
        if (num < 10) {
            return '0' + String(num);
        } else {
            return String(num);
        }
    }
}