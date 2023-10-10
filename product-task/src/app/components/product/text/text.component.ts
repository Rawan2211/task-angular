import { Component, Input,Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html'
})
export class TextComponent {
@Input() textValue!:string;


}
