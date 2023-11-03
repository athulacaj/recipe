import { PrismaClient } from '@prisma/client'
import recipeObj from './data'


console.log("node start");

const prisma = new PrismaClient({
  log: ['error'],
});






async function insert(){
  for(var recipe of recipeObj["items"]){
     await prisma.recipes.create({
      data:{
        recipe_id:recipe["yt_id"],
        name:recipe["name"],
        is_veg:recipe['isVeg'],
        time:recipe["time"],
        description:recipe["description"],
        instructions:recipe["instructions"].join("\n"),
        category:recipe["category"].map(e=>e.toLowerCase()),
        tags:recipe["tags"].map(e=>e.toLowerCase()),
        main_ingredient:recipe["mainIngredient"].toLowerCase(),
        Ingredients:{
          create:recipe["ingredients"],
        },
        Youtube:{
          create:{
            youtube_id:recipe["youtube"]["id"],
            name:recipe["youtube"]["name"],
            language:recipe["youtube"]["language"].toLowerCase(),
            country:recipe["youtube"]["country"].toLowerCase()
          }
        }
      }
     })
  }


//   console.log(result)
}9040



// insert()
//   .then(async () => {
//     // console.log('success')
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     // console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })