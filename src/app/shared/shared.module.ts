import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SuccesSendComponent } from './Dialogs/succes-send/succes-send.component';
import { MinValidator, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './Dialogs/pop-up/pop-up.component';
import { SureComponent } from './Dialogs/sure/sure.component';
import { MoneyFormat } from './pipes/money-format.pipe';
import { FormatDate } from './pipes/format-date.pipe';
import { FormatDateWithDay } from './pipes/format-date-with-day.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SuccesSendComponent,
    PopUpComponent,
    SureComponent,
    MoneyFormat,
    FormatDate,
    FormatDateWithDay
  ],
  providers : [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    CurrencyPipe,
    MatSnackBarModule
  ],
  exports: [MinValidator ,CurrencyPipe, MoneyFormat,FormatDate,FormatDateWithDay]
})
export class SharedModule { }
