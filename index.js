const express = require("express")
const app = express()

const { initializeDatabase } = require("./db/db.connect")

const Recipe = require("./models.js/recipe.models")
app.use(express.json())

initializeDatabase()

const recipe = {
    title: "Spaghetti Carbonara",
    author: "Sanjeev Kapoor",
    difficulty: "Intermediate",
    prepTime: 20,
    cookTime: 15,
    ingredients: [
      "200g spaghetti",
      "100g guanciale or pancetta, diced",
      "2 large eggs",
      "50g grated Pecorino Romano cheese",
      "Salt and black pepper to taste"
    ],
    instructions: [
      "Cook the spaghetti in boiling salted water until al dente.",
      "Meanwhile, sauté the guanciale or pancetta until crispy.",
      "In a bowl, whisk together eggs and grated cheese.",
      "Drain the spaghetti and immediately toss with the egg mixture and cooked guanciale/pancetta.",
      "Season with salt and pepper. Serve immediately."
    ],
    imageUrl: "https://example.com/spaghetti_carbonara.jpg"
  }

  const recipeData = {
    "title": "Chicken Tikka Masala",
    "author": "Sanjeev Kapoor",
    "difficulty": "Intermediate",
    "prepTime": 30,
    "cookTime": 30,
    "ingredients": [
      "500g boneless, skinless chicken thighs, cut into bite-sized pieces",
      "1 cup plain yogurt",
      "2 tablespoons vegetable oil",
      "2 onions, finely chopped",
      "4 cloves garlic, minced",
      "1-inch piece of ginger, grated",
      "2 teaspoons ground coriander",
      "1 teaspoon ground cumin",
      "1 teaspoon paprika",
      "1/2 teaspoon turmeric",
      "1/2 teaspoon cayenne pepper (adjust to taste)",
      "1 cup tomato puree",
      "1 cup heavy cream",
      "Salt and cilantro leaves for garnish"
    ],
    "instructions": [
      "Marinate chicken pieces in yogurt and spices for at least 1 hour.",
      "Heat oil in a pan and sauté onions, garlic, and ginger until golden.",
      "Add marinated chicken and cook until browned.",
      "Stir in tomato puree and cook until chicken is cooked through.",
      "Add cream, season with salt, and simmer for a few minutes.",
      "Garnish with cilantro leaves and serve with rice or naan."
    ],
    "imageUrl": "https://example.com/chicken_tikka_masala.jpg"
  }

  const newRecipeData = {
    title: 'Classic Chocolate Chip Cookies',
    author: 'Baker Betty',
    difficulty: 'Easy',
    prepTime: 15,
    cookTime: 10,
    ingredients: [
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed light brown sugar',
      '1 teaspoon vanilla extract',
      '2 large eggs',
      '2 1/4 cups all-purpose flour',
      '1 teaspoon baking soda',
      '1/2 teaspoon salt',
      '2 cups semisweet chocolate chips'
    ],
    instructions: [
      'Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.',
      'Beat in the vanilla extract and eggs one at a time until well blended.',
      'Combine the flour, baking soda, and salt; gradually stir into the creamed mixture.',
      'Stir in the chocolate chips by hand using a wooden spoon.',
      'Drop by rounded spoonfuls onto the prepared baking sheets.',
      'Bake for 8 to 10 minutes in the preheated oven, or until edges are golden.',
      'Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely.'
    ],
    imageUrl: 'https://example.com/classic_chocolate_chip_cookies.jpg'
  }
  


  async function createRecipe(recipe){                               //(3)
    try{
        const newRecipe = new Recipe(recipe)
        const saveRecipe = await newRecipe.save()
        return saveRecipe;

    }catch(error){
        console.log(error)
    }
  }

  app.post("/recipes", async(req, res)=> {
    try{
        const savedRecipe = await createRecipe(req.body)
        res.status(200).json({message: "Recipe added successfully.", recipe: savedRecipe})

    }catch(error){
        res.status(500).json({error: "Failed to add reipe."})
    }
  })

  async function createNewRecipe(recipeData) {                             //(4)
    try{
        const newRecipe = new Recipe(recipeData)
        const saveRecipe = await newRecipe.save()
        return saveRecipe;

    }catch(error){
        console.log(error)
    }
  }

  app.post("/recipes2", async(req, res)=> {
    try{
        const savedRecipe = await createNewRecipe(req.body)
        if(savedRecipe){
            res.status(200).json({message: "Recipe added successfully.", recipe: savedRecipe})
        }

    }catch(error){
        res.status(500).json({error: "Failed to add recipe."})
    }
  })

  async function createRecipeData(newRecipeData){                                //(5)
    try{
        const newRecipe = new Recipe(newRecipeData)
        const saveRecipe = await newRecipe.save()
        return saveRecipe;

    }catch(error){
        console.log(error)
    }
  }

  app.post("/recipes3", async(req, res)=> {
    try{
        const savedRecipe = await createRecipeData(req.body)
        if(savedRecipe){
            res.status(200).json({message: "Recipe Added Successfully.", recipe: savedRecipe})
        }

    }catch(error){
        res.status(500).json({error: "Failed to add recipe."})
    }
  })

  async function readAllRecipe(){                                                     //(6)
    try{
        const allRecipe = await Recipe.find()
        return allRecipe;

    }catch(error){
        console.log(error)
    }
  }

  app.get("/recipes", async(req, res)=> {
    try{
        const recipes = await readAllRecipe(req.body)
        if(recipes.length != 0){
            res.json(recipes)
        } else {
            res.status(404).json({error: "Recipe not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch recipes."})
    }
  })

  async function readRecipeByTitle(recipeTitle){                                             //(7)
    try{
        const recipeByTitle = await Recipe.findOne({title: recipeTitle})
        return recipeByTitle;

    }catch(error){
        console.log(error)
    }
  }
  
  app.get("/recipes/:recipeTitle", async(req, res)=> {
    try{
        const recipeByTitle = await readRecipeByTitle(req.params.recipeTitle)
        if(recipeByTitle) {
            res.json(recipeByTitle)
        } else {
            res.status(404).json({error: "Recipe not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch recipe by title."})
    }
  })

  async function readRecipeByAuthor(recipeAuthor){                                          //(8)
    try{
        const recipeByAuthor = await Recipe.findOne({author: recipeAuthor})
        return recipeByAuthor;

    }catch(error){
        console.log(error)
    }
  }

  app.get("/recipes/author/:authorName", async(req, res)=> {
    try{
        const recipe = await readRecipeByAuthor(req.params.authorName)
        if(recipe){
            res.json(recipe)
        } else {
            res.status(404).json({error: "Recipe Not Found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch recipe by author."})
    }
  })

  async function readRecipeByDifficulty(recipeDifficulty){                                //(9)
    try{
        const recipeByDifficulty = await Recipe.find({difficulty: recipeDifficulty})
        return recipeByDifficulty;

    }catch(error){
        console.log(error)
    }
  }

  app.get("/recipes/difficulty/:difficultyLevel", async(req, res)=> {
    try{
        const recipe = await readRecipeByDifficulty(req.params.difficultyLevel)
        if(recipe.length != 0){
             res.json(recipe)
        } else {
            res.status(404).json({error: "Recipe Not Found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch recipe by difficulty level."})
    }
  })


  async function updateRecipeDifficulty(recipeId, dataToUpdate){                                    //(10)
    try{
        const difficultyLevelUpdate = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
         return difficultyLevelUpdate;
    }catch(error){
        console.log(error)
    }
  }

  app.post("/recipes/:recipeId", async(req, res)=> {
    try{
        const updatedRecipe = await updateRecipeDifficulty(req.params.recipeId, req.body)
        if(updatedRecipe){
            res.status(200).json({message: "Recipe updated successfully.", recipe: updatedRecipe})
        } else {
            res.status(404).json({error: "Recipe doed not found."})
        }
        
    }catch(error){
        res.status(500).json({error: "Failed to update recipe."})
    }
  })

  async function updateRecipe(recipeTitle, dataToUpdate){                                    //(11)
    try{
        const updates = await Recipe.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return updates;

    }catch(error){
        console.log(error)
    }
  }

  app.post("/recipes/title/:recipeTitle", async(req, res)=> {
    try{
        const updatedRecipe = await updateRecipe(req.params.recipeTitle, req.body)
        if(updatedRecipe){
            res.status(200).json({message: "Recipe updated successfully.", recipe: updatedRecipe})
        }else {
            res.status(404).json({error: "Recipe not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to update recipe."})
    }
  })

  async function deleteRecipe(recipeId){                                                       //(12)
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        return deletedRecipe;

    }catch(error){
        console.log(error)
    }
  }

  app.delete("/recipes/:recipeId", async(req, res)=> {
    try{
        const deletedRecipe = await deleteRecipe(req.params.recipeId)
        if(deletedRecipe){
            res.status(200).json({message: "Recipe deleted successfully."})
        } else {
            res.status(404).json({error: "Recipe not found."})
        }
       

    }catch(error){
        res.status(500).json({error: "Failed to delete recipe."})
    }
  })





  const PORT = 3000;
  app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
  })