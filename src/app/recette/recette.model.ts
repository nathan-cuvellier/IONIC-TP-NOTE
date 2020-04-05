export class Recipe {
    constructor(
        public id: string,
        public titre: string,
        public image: string,
        public numberShare: number,
        public ingredient: string,
        public preparationTime: number,
        public cookingTime: number
    )  {}
}
