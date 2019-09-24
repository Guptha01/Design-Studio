import { Component } from '@angular/core';
import { AppService } from './app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DesignStudioUI';
successmessage:string;
errorMessage:string
  constructor(private appservice : AppService) {
}
ngOnInit() {
  this.appservice.getData().subscribe(
    (success) => {  
      console.log(success, typeof success);
      this.successmessage= success['username']; 
      console.log(this.successmessage, typeof this.successmessage);
      
    },
    (err) => {
      this.errorMessage = err.error.message;
    }    
    )
}
}
