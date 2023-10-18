import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import{TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
constructor(@Inject(MAT_DIALOG_DATA)public data: any , public translate:TranslateService){

}


}
