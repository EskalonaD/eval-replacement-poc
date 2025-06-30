import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunScriptInContext {
  private script: any; 
  constructor() { }

  saveScript() {
    this.script = (window as any).script 
  }

  runScript() {
    const context = {

      getData: function getData() { return 'hello'},
      processData: function processData(data: any) {console.log(data + ' world')}
    }


    this.script.do(context);
  }
}
