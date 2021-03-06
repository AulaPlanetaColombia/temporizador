import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemporizadorComponent } from './temporizador/temporizador.component';
import { HeaderComponent } from './header/header.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { ResumenComponent } from './resumen/resumen.component';

@NgModule({
    declarations: [
        AppComponent,
        TemporizadorComponent,
        HeaderComponent,
        CuerpoComponent,
        ResumenComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatSelectModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
