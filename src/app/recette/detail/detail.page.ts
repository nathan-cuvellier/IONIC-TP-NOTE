import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingController, NavController} from '@ionic/angular';
import {RecettesService} from '../recette.service';
import {Recipe} from '../recette.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  recette: Recipe;
  recetteSub: Subscription;
  isLoading = true;

  // tslint:disable-next-line:max-line-length
  constructor(private recettesSrvc: RecettesService, private loadingCtrl: LoadingController, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/liste');
        return;
      }

      this.loadingCtrl.create({message: 'Chargement...'})
          .then(loadingEl => {
            loadingEl.present();
            this.recetteSub = this.recettesSrvc.getRecette(paramMap.get('id')).subscribe(tmpRecette => {
              this.recette = tmpRecette;
              loadingEl.dismiss();
              this.isLoading = false;
            });
          });
    });
  }

  ngOnDestroy() {
    if (this.recetteSub) {
      this.recetteSub.unsubscribe();
    }
  }

}
