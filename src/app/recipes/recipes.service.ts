import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: "r1",
      title: "champion1",
      imageUrl: "https://www.mobafire.com/images/avatars/ahri-classic.png",
      ingredients: ["ahri", "worwick", "ezreal"]
    },
    {
      id: "r2",
      title: "champion2",
      imageUrl: "https://www.mobafire.com/images/avatars/ahri-classic.png",
      ingredients: ["ahri", "worwick", "ezreal"]
    }
  ];

  constructor() {}

  getAllRecipes() {
    return this.recipes;
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id == recipeId;
      })
    };
  }
}
