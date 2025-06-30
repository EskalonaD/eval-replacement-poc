import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RunScriptInContext } from './run-script-in-context';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'front-dev';
  private http = inject(HttpClient);
  private renderer = inject(Renderer2);
  private runScriptInContextService = inject(RunScriptInContext);

  downloadScript() {
    const scriptEl = this.renderer.createElement('script') as HTMLScriptElement;

    scriptEl.src = './script';

    scriptEl.addEventListener('load', () => this.runScriptInContextService.saveScript());
    this.renderer.appendChild(document.body, scriptEl);
  }
  downloadSourceScript() {
    const scriptEl = this.renderer.createElement('script') as HTMLScriptElement;

    scriptEl.src = 'http://localhost:3001/script';

    scriptEl.addEventListener('load', () => this.runScriptInContextService.saveScript());
    this.renderer.appendChild(document.body, scriptEl);
  }
  downloadForeignScript() {
    const scriptEl = this.renderer.createElement('script') as HTMLScriptElement;

    scriptEl.src = 'http://localhost:3002/script';

    scriptEl.addEventListener('load', () => this.runScriptInContextService.saveScript());
    this.renderer.appendChild(document.body, scriptEl);
  }

  useScript() {
    this.runScriptInContextService.runScript();
  }
}
