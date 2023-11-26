import { Component } from '@angular/core';
import { FontService } from '../../services/font.service';

@Component({
  selector: 'app-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.css']
})
export class FontComponent {
  fonts: any[] = []; 
  loadedFonts: any[] = []; 
  pageSize = 9; 
  selectedFont : any;

  constructor(private fontService: FontService) { }

  ngOnInit(): void {
    this.loadFonts();
  }

  loadFonts() {
    this.fontService.getFonts().subscribe(
      data => {
        this.fonts = data.items;
  
        var selectedFonts = this.fonts.map(font => font.family);
        const selectedFontObjects = this.fonts.filter(font => selectedFonts.includes(font.family));
       const fontStyles = this.fontService.generateFontStyles(selectedFontObjects.map(font => font.family));

        this.injectStyles(fontStyles);
  
        // Postavite prvih `pageSize` fontova kao učitane
        this.loadedFonts = this.fonts.slice(0, this.pageSize);
      },
      error => {
        console.error('Greška prilikom dohvatanja fontova:', error);
      }
    );
  }

  injectStyles(styles: string) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
  }

  loadMoreFonts() {
    const remainingFonts = this.fonts.slice(this.loadedFonts.length, this.loadedFonts.length + this.pageSize);
    this.loadedFonts = this.loadedFonts.concat(remainingFonts);
  }
}
