-- REQUETE QUI RECUPERE UNE RECETTE AVEC CES INGREDIENTS ET SON CREATEUR
SELECT "rec_recipe"."recipe_id", "recipe_title", "recipe_description", "recipe_duration", "recipe_person", "recipe_level", "recipe_image_large", "recipe_image_medium", 
        "recipe_image_small", "recipe_created_at", "recipe_updated_at", "user_firstname", "user_lastname", "rec_user"."user_id", "rec_recipe_has_ingredient"."recipe_has_ingredient_quantity", "rec_recipe_has_ingredient"."recipe_has_ingredient_unit", "rec_ingredient"."ingredient_name"
        
        FROM "rec_recipe" 
        INNER JOIN "rec_user" ON "rec_recipe"."user_id" = "rec_user"."user_id" 
       	INNER JOIN "rec_recipe_has_ingredient" ON "rec_recipe"."recipe_id" = "rec_recipe_has_ingredient"."recipe_id"
        INNER JOIN "rec_ingredient" ON "rec_recipe_has_ingredient"."ingredient_id" = "rec_ingredient"."ingredient_id"
        WHERE "rec_recipe"."recipe_id" = 4;

-- RECUPERE LES INGREDIENTS
SELECT "rec_recipe_has_ingredient"."recipe_has_ingredient_quantity", "rec_recipe_has_ingredient"."recipe_has_ingredient_unit", "rec_ingredient"."ingredient_name"
FROM "rec_recipe_has_ingredient" 
INNER JOIN "rec_ingredient" ON "rec_ingredient"."ingredient_id" = "rec_recipe_has_ingredient"."ingredient_id"
WHERE "rec_recipe_has_ingredient"."recipe_id" = 4