import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";
import { AlertController } from "@ionic/angular";
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"]
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("recipeId")) {
        this.router.navigate(["/recipes"]);
        return;
      }
      const recipeId = paramMap.get("recipeId");
      this.recipe = this.recipeService.getRecipe(recipeId);
    });
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }
  
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  onDeleteRecipe() {
    this.alertController.create({
      header: "Are you sure?",
      message: "Do you really want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.recipeService.deleteRecipe(this.recipe.id);
            this.router.navigate(["/recipes"]);
          }
        }
      ]
    })
    .then(alertEl =>{
      alertEl.present();
    });
  }
}
