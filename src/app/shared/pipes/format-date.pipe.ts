import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDate'
})
export class FormatDate implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}
  
    transform(value: string, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
      const meseci = [
        'Јануар',
        'Фебруар',
        'Март',
        'Април',
        'Мај',
        'Јун',
        'Јул',
        'Август',
        'Септембар',
        'Октобар',
        'Новембар',
        'Децембар'
      ];
    
      const datePipe: DatePipe = new DatePipe(this.locale);
      const formattedDate = datePipe.transform(value, format);
      let result =  formattedDate || value;
      const d = new Date(result);
      const dan = d.getDate();
      const godina = d.getFullYear();
      const brojMeseca = d.getMonth() + 1;
      let mesec;
      if (brojMeseca >= 1 && brojMeseca <= 12) {
        mesec = meseci[brojMeseca - 1];
      } else {
        mesec = brojMeseca;
      }

      const sati = d.getHours();
      const minuti = d.getMinutes();

      return `${dan}. ${mesec} ${godina}. ${sati}h ${minuti < 10 ? "0"+minuti: minuti}min`;
      
    }

}
