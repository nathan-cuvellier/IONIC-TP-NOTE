import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recette.model';
import {RecettesService} from '../recette.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit, OnDestroy {
  listRecettes: Recipe[];
  private listeRecettesSub: Subscription;

  constructor(private recettesSrvc: RecettesService) { }

  ngOnInit() {
    this.listeRecettesSub = this.recettesSrvc.getRecettes().subscribe(tmpRecette => {
      this.listRecettes = tmpRecette;
    });
  }

  onKeyUp($event: CustomEvent) {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.recettesSrvc.filtreRecette($event.target.value).subscribe(tmpRecette => {
      this.listRecettes = tmpRecette;
    });
  }

  ngOnDestroy() {
    if (this.listeRecettesSub) {
      this.listeRecettesSub.unsubscribe();
    }
  }
}
