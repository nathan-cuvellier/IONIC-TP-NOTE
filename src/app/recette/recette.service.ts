import {Injectable} from '@angular/core';
import {Recipe} from './recette.model';
import {BehaviorSubject} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecettesService {
    private recettes = new BehaviorSubject<Recipe[]>([
        // tslint:disable-next-line:max-line-length
        new Recipe(
            // tslint:disable-next-line:max-line-length
            '1', 'Sauce Bolognèse', 'https://assets.afcdn.com/recipe/20171115/75051_w648h414c1cx1750cy2625cxt0cyt0cxb3500cyb5250.jpg', 4, 'tomates pelées,viandes hachée,concentré de tomates,carottes,champignons,oignon', 15, 60
        ),
        new Recipe(
            // tslint:disable-next-line:max-line-length
            '2', 'Sauce Béchamel', 'https://img.cuisineaz.com/240x192/2018-03-19/i136751-sauce-bechamel.jpeg', 2, 'farine,beurre,lait', 10, 6
        )
    ]);

    constructor() {
    }

    getRecettes() {
        return this.recettes.asObservable();
    }

    getRecette(recetteId: string) {
        return this.getRecettes().pipe(
            take(1),
            delay(1000),
            map(tmpRecettes => {
                return {...tmpRecettes.find(p => p.id === recetteId)};
            })
        );
    }

    modifieRecette(pId: string, pTitre: string, pNumberShare: number, pIngredient: string, pPreparationTime: number, cookingTime: number) {
        return this.getRecettes().pipe(
            take(1),
            delay(1000),
            tap(tmpRecettes => {
                const tmpNewRecetteIndex = tmpRecettes.findIndex(tmpRecette => tmpRecette.id === pId);
                const tmpNewRecettes = [...tmpRecettes];
                console.log('tmpNewRecetteIndex ' + tmpNewRecetteIndex);
                tmpNewRecettes[tmpNewRecetteIndex] = new Recipe(
                    pId,
                    pTitre,
                    'https://assets.afcdn.com/recipe/20171115/75051_w648h414c1cx1750cy2625cxt0cyt0cxb3500cyb5250.jpg',
                    pNumberShare,
                    pIngredient,
                    pPreparationTime,
                    cookingTime
                );
                this.recettes.next(tmpNewRecettes);
            })
        );
    }

    ajouteRecette(pTitre: string, pNumberShare: number, pIngredient: string, pPreparationTime: number, cookingTime: number) {
        const tmpNewLieu = new Recipe(
            pTitre.replace(' ', '-'),
            pTitre,
            'https://assets.afcdn.com/recipe/20171115/75051_w648h414c1cx1750cy2625cxt0cyt0cxb3500cyb5250.jpg',
            pNumberShare,
            pIngredient,
            pPreparationTime,
            cookingTime
        );

        return this.getRecettes().pipe(
            take(1),
            delay(1000),
            tap(tmpRecettes => {
                this.recettes.next(tmpRecettes.concat(tmpNewLieu));
            })
        );
    }

    filtreRecette(text: string) {
        return this.getRecettes().pipe(
            map(tmpRecettes => {
                return tmpRecettes.filter(r => r.titre.toLowerCase().indexOf(text.toLowerCase().trim()) !== -1);
            })
        );
    }

}
