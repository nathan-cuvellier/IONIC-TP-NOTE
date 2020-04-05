import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recette.model';
import {Subscription} from 'rxjs';
import {RecettesService} from '../recette.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-editer',
    templateUrl: './editer.page.html',
    styleUrls: ['./editer.page.scss'],
})
export class EditerPage implements OnInit, OnDestroy {
    recette: Recipe;
    recetteSub: Subscription;
    form: FormGroup;
    isLoading = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController,
                private loadingCtrl: LoadingController,
                private recetteSrvc: RecettesService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('id')) {
                this.navCtrl.navigateBack('/liste');
                return;
            }
            if (paramMap.get('id') === 'new') {
                this.form = new FormGroup({
                    // tslint:disable-next-line:max-line-length
                    titre: new FormControl(null, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
                    }),
                    numberShare: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
                    ingredient: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
                    preparationTime: new FormControl(null, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    }),
                    cookingTime: new FormControl(null, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.maxLength(255)]
                    })
                });
                this.isLoading = false;
            } else {
                this.loadingCtrl.create({message: 'Chargement...'})
                    .then(loadingEl => {
                        loadingEl.present();
                        this.recetteSub = this.recetteSrvc.getRecette(paramMap.get('id')).subscribe(tmpRecette => {
                            this.recette = tmpRecette;

                            this.form = new FormGroup({
                                // tslint:disable-next-line:max-line-length
                                titre: new FormControl(this.recette.titre, {
                                    updateOn: 'blur',
                                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
                                }),
                                // tslint:disable-next-line:max-line-length
                                numberShare: new FormControl(this.recette.numberShare, {updateOn: 'blur', validators: [Validators.required]}),
                                ingredient: new FormControl(this.recette.ingredient, {updateOn: 'blur', validators: [Validators.required]}),
                                preparationTime: new FormControl(this.recette.preparationTime, {
                                    updateOn: 'blur',
                                    validators: [Validators.required]
                                }),
                                cookingTime: new FormControl(this.recette.cookingTime, {
                                    updateOn: 'blur',
                                    validators: [Validators.required, Validators.maxLength(255)]
                                })
                            });
                            loadingEl.dismiss();
                            this.isLoading = false;
                        });
                    });
            }

        });

    }

    ngOnDestroy() {
        if (this.recetteSub) {
            this.recetteSub.unsubscribe();
        }
    }

    cancel() {
        if (this.recette) {
            this.navCtrl.navigateBack('/detail/' + this.recette.id);
        } else {
            this.navCtrl.navigateBack('/liste');
        }
        return;
    }

    onEditRecette() {
        if (!this.form.valid) {
            return;
        }
        if (this.recette) {
            this.loadingCtrl.create({message: 'Mise à jour de la recette en cours...'})
                .then(loadingEl => {
                    loadingEl.present();
                    // tslint:disable-next-line:max-line-length
                    this.recetteSrvc.modifieRecette(this.recette.id, this.form.value.titre, this.form.value.numberShare, this.form.value.ingredient, this.form.value.preparationTime, this.form.value.cookingTime).subscribe(() => {
                        this.form.reset();
                        this.router.navigateByUrl('/detail/' + this.recette.id);
                        loadingEl.dismiss();
                    });
                });
        } else {
            this.loadingCtrl.create({message: 'Creation de la recette en cours...'})
                .then(loadingEl => {
                    loadingEl.present();
                    const id = this.form.value.titre.toString().replace(' ', '-');
                    // tslint:disable-next-line:max-line-length
                    this.recetteSrvc.ajouteRecette(this.form.value.titre, this.form.value.numberShare, this.form.value.ingredient, this.form.value.preparationTime, this.form.value.cookingTime).subscribe(() => {
                        this.form.reset();
                        this.router.navigateByUrl('/liste');
                        loadingEl.dismiss();
                    });
                });
        }
    }

    slug() {
        return this.form.value.titre.toString().replace(' ', '-');
    }
}
