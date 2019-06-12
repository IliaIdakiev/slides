import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {

  post$: Observable<IPost>;

  emptyPost: IPost = {
    title: '',
    id: 0,
    userId: 0,
    body: ''
  };

  get closeNavigationUrl(): string {
    return this.data && this.data.closeNavigationUrl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    postService: PostService
  ) {
    this.post$ = of(this.emptyPost);
    this.post$ = postService.entity$.pipe(map(val => val ? val : this.emptyPost), shareReplay());
  }

  private closeDialog() {
    this.router.navigateByUrl(this.closeNavigationUrl);
  }

  saveHandler() {
    this.closeDialog();
  }

  cancelHandler() {
    this.closeDialog();
  }
}
