import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario:string;
  message: string;
  @ViewChild("divMessages", { read: ElementRef }) private divMessages: ElementRef;
  constructor(private renderer: Renderer2,
    private http: HttpClient,
    private socket: Socket) {
    //http.get('http://localhost:3000/').subscribe(params => console.log(params));
    http.get('https://thawing-waters-69626.herokuapp.com/').subscribe(params => console.log(params));
    socket.connect();
    socket.emit("setUsuario",this.usuario);
    socket.on("message", (param: object) => {
      //create the DOM element 
      let p: HTMLParagraphElement = this.renderer.createElement('p');
      //create text for the element
      p.innerHTML = `<b>${param['usuario']} dice</b>: <br> ${param['mssg']}`;
      //Now append the li tag to divMessages div
      this.renderer.appendChild(this.divMessages.nativeElement, p);
    })
  }

  sendMessage() {
    this.socket.emit("setUsuario",this.usuario);
    this.socket.emit("message",this.message);
    //create the DOM element 
    let p: HTMLParagraphElement = this.renderer.createElement('p');
    //create text for the element
    p.innerHTML = `<b>${this.usuario} dice</b>: <br> ${this.message}`;
    //Now append the li tag to divMessages div
    this.renderer.appendChild(this.divMessages.nativeElement, p);
    console.log(this.message);
    this.message = '';
  }

}
