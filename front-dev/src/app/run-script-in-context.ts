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
      args: [],

      getData: () => { return 'hello'},
      processData: (data: any) => {console.log(data + ' world')},
      execute: (ref: string, ...args: any[]) => {
        const innerContext = {
          ...context,
          args,
        };

        this.script[ref](innerContext);
      }
    }


    this.script.do(context);
  }
}
