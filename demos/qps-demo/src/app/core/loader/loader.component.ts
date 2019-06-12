import { Component } from '@angular/core';
import { LoaderService } from '../../shared/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  loading$: Observable<boolean>;

  constructor(loaderService: LoaderService) {
    this.loading$ = loaderService.loading$;
  }


}
