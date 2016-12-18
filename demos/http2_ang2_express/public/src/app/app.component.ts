import { Component } from '@angular/core';
import { Http } from '@angular/http'; 
import { EventSourceService } from './shared/event-source.service';
import 'rxjs/add/operator/map';

enum MessageType {
  Video,
  Text
}

interface IMessage {
  type: MessageType,
  content: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  MessageType = MessageType;
  nickname:string = '';
  message:string = '';
  conversation:IMessage[] = [];
  isConnected:boolean = false;

  constructor(private _eventSourceService:EventSourceService, private _http:Http) {

  }

  connect() {
    this._eventSourceService.connect(`/chat?nickname=${this.nickname}`);
    
    this._eventSourceService.on('connected').subscribe(() => { 
      this.isConnected = true;
      this.conversation.push({ type: MessageType.Text, content: 'You are now connected!' }); 
    });
    
    this._eventSourceService.on('new-message').subscribe(message => {
      let data = JSON.parse(message.data);
      this.conversation.push({ type: MessageType.Text, content: `${data.nickname}: ${data.message}` });
    });
  }

  sendData() {
    this._http.post('/message', { message: this.message, nickname: this.nickname }).subscribe(() => this.message = '');
  }
}
