BEGIN;
    DROP TABLE IF EXISTS "rec_role","rec_user", "rec_recipe", "rec_ingredient", "rec_recipe_has_ingredient", "rec_recipe_has_like_favorites";
    
    CREATE TABLE "rec_role" (
        "role_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "role_name" TEXT NOT NULL,
        "role_created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE "rec_user" (
        "user_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "user_lastname" TEXT NOT NULL,
        "user_firstname" TEXT NOT NULL,
        "user_email" TEXT NOT NULL UNIQUE,
        "user_password" TEXT NOT NULL,
        "user_created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "user_updated_at" TIMESTAMPTZ,
        "role_id" INTEGER NOT NULL DEFAULT 2 REFERENCES "rec_role"("role_id")
    );

    CREATE TABLE "rec_recipe" (
        "recipe_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
        "recipe_title" TEXT NOT NULL,
        "recipe_description" TEXT NOT NULL,
        "recipe_image_large" TEXT DEFAULT 'http://localhost:5050/static/recipe_images/Caloris.png',
        "recipe_image_medium" TEXT NOT NULL,
        "recipe_image_small" TEXT NOT NULL,
        "recipe_duration" INTEGER NOT NULL,
        "recipe_person" INTEGER NOT NULL,
        "recipe_level" TEXT NOT NULL,
        "recipe_created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "recipe_updated_at" TIMESTAMPTZ,
        "user_id" INTEGER NOT NULL REFERENCES "rec_user"("user_id") ON DELETE CASCADE
    );

    CREATE TABLE "rec_ingredient" (
        "ingredient_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "ingredient_name" TEXT NOT NULL,
        "ingredient_created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE "rec_recipe_has_ingredient" (
        -- "recipe_has_ingredient_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "recipe_has_ingredient_quantity" INTEGER,
        "recipe_has_ingredient_unit" TEXT,
        "recipe_has_ingredient_created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "recipe_has_ingredient_updated_at" TIMESTAMPTZ,
        "recipe_id" INTEGER NOT NULL REFERENCES "rec_recipe"("recipe_id") ON DELETE CASCADE,
        "ingredient_id" INTEGER NOT NULL REFERENCES "rec_ingredient"("ingredient_id") ON DELETE CASCADE,
        PRIMARY KEY ("recipe_id", "ingredient_id")
    );

    CREATE TABLE "rec_recipe_has_like_favorites" (
        --"like_favorites_id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "like_favorites_created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "like_favorites_updated_at" TIMESTAMPTZ,
        "like_favorites_isFavorite" BOOLEAN DEFAULT FALSE,
        "like_favorites_isLike" BOOLEAN DEFAULT FALSE,
        "recipe_id" INTEGER NOT NULL REFERENCES "rec_recipe"("recipe_id") ON DELETE CASCADE,
        "user_id" INTEGER NOT NULL REFERENCES "rec_user"("user_id") ON DELETE CASCADE,
        PRIMARY KEY ("recipe_id", "user_id") 
    );

    INSERT INTO "rec_role" ("role_name") VALUES 
    ('admins'),
    ('members');

    INSERT INTO "rec_user" ("user_lastname", "user_firstname", "user_email", "user_password", "role_id") VALUES
    ('Gourouvin', 'Laurent', 'gourouvin.laurent@gmail.com', '$2b$10$/u6Y3dbRPyi8eQ5wog5Fj.DSv21cNgCCTrSlMSkYhjSVIMCTOHbia', 1),
    ('Gaoua','Adam','gaoua.adam@gmail.com', 'adam', 2),
    ('Saudemont', 'Alexandre', 'saudemont.alexandre@gmail.com', 'alexandre', 2);

    INSERT INTO "rec_recipe" ("recipe_title", "recipe_image_large", "recipe_image_medium", "recipe_image_small" ,"recipe_description","recipe_level", "user_id", "recipe_duration","recipe_person") VALUES
    ('Naan au fromage', 'http://localhost:5050/static/recipe_images/maxSize-naan_fromage.webp1665793521382-640696590.webp','http://localhost:5050/static/recipe_images/medSize-naan_fromage.webp1665793521382-640696590.webp','http://localhost:5050/static/recipe_images/minSize-naan_fromage.webp1665793521382-640696590.webp', '
    <h2 class="text-xl">ÉTAPE 1</h2>
    <ul>
    <li>levure</li>
    <li>sucre</li>
    <li>sel</li>
    </ul>
    <p>On met la levure dans l’eau tiède, puis le sucre et le sel.</p>
    <h2 class="text-xl">ÉTAPE 2</h2>
<ul>
<li>lait</li>
<li>huile</li>
</ul>
<p>On ajoute le lait et l’huile et on mélange.</p>

<h2 class="text-xl font-semibold">ÉTAPE 3</h2>
<ul><li>farine</li></ul>
<p>On ajoute à la farine.</p>

<h2 class="text-xl font-semibold">ÉTAPE 4</h2>
<ul><li>huile</li></ul>
<p>On mélange pour avoir une pâte qui doit être assez liquide et collante, puis on recouvre d’un peu d’huile, on couvre et on laisse reposer 10 à 15 min.</p>

<h2 class="text-xl font-semibold">ÉTAPE 5</h2>
<ul><li>farine</li></ul>
<p>Ensuite on forme les naans : de petites boules de pâte de la taille d’un poing, qu’on roule dans la farine et qu’on laisse reposer 15 à 20 min en les recouvrant d’un torchon.</p>

<h2 class="text-xl font-semibold text-red-500">ÉTAPE 6</h2>
<p>On préchauffe le four au maximum et on met une grille tout en haut.</p>

<h2 class="text-xl font-semibold">ÉTAPE 7</h2>
<p>Pour façonner un naan, on prend une boule et on la passe d’une paume de la main à l’autre : elle s’étire naturellement jusqu’à former une sorte de « goutte » que l’on va placer sur un plat beurré ou recouvert d’un papier cuisson.</p>

<h2 class="text-xl font-semibold">ÉTAPE 8</h2>
<p>On met au four au plus près de la source de chaleur et on fait cuire 2min30 environ (ou plus si votre four ne monte pas très haut en température).</p>

<h2 class="text-xl font-semibold">ÉTAPE 9</h2>
<p>En les sortant, on les recouvre de beurre fondu… et on les sert de suite !</p>

<h2 class="text-x font-semibold">ÉTAPE 10</h2>
<p>Variantes : on saupoudre le naan d’ail haché, d’oignon émincé, de graines, avant de le mettre au four. Pour un naan au fromage, on place une portion de Vache qui rit au milieu du naan, on le replie et on l’étale avant cuisson.</p>
', 'Facile',1, 60, 1),
    ('Tarte aux fraises', 'http://localhost:5050/static/recipe_images/maxSize-tartes_fraises.webp1665793476609-964584974.webp','http://localhost:5050/static/recipe_images/medSize-tartes_fraises.webp1665793476609-964584974.webp','http://localhost:5050/static/recipe_images/medSize-tartes_fraises.webp1665793476609-964584974.webp' ,'Tarte aux fraises à la crème','Intermédiaire', 2,45,4),
    ('Pâtes carbonnara', 'http://localhost:5050/static/recipe_images/maxSize-pates_carbonara.webp1665794004659-210874367.webp', 'http://localhost:5050/static/recipe_images/medSize-pates_carbonara.webp1665794004659-210874367.webp', 'http://localhost:5050/static/recipe_images/minSize-pates_carbonara.webp1665794004659-210874367.webp', 'Des pâtes carbonnara cuisiner à l''italienne','Facile', 3,12,2);

    INSERT INTO "rec_ingredient" ("ingredient_name") VALUES
    ('Tomate'),
    ('Pâtes'),
    ('Citron'),
    ('Poulet'),
    ('Courgette'),
    ('Cocombre'),
    ('Crème frâiche'),
    ('Boeuf'),
    ('Maïs'),
    ('Oeuf'),
    ('Porc'),
    ('Saumon'),
    ('Champignon de Paris'),
    ('Lotte'),
    ('Fraise'),
    ('Chocolat'),
    ('Fromage Rapé'),
    ('Parmessan'),
    ('Piment d''espelette'),
    ('Farine'),
    ('Yaourt Nature'),
    ('Sel'),
    ('Eau'),
    ('Huile'),
    ('Levure Chimique'),
    ('Bar');

    -- INSERT INTO "rec_recipe_has_ingredient" ("recipe_id", "ingredient_id") VALUES
    -- (1,19),
    -- (1,20),
    -- (1,21),
    -- (1,22),
    -- (1,23),
    -- (1,24);

    -- INSERT INTO "rec_recipe_has_like_favorites" ("recipe_id", "user_id") VALUES
    -- (1,1),
    -- (2,1),
    -- (3,1),
    -- (1,2),
    -- (2,2),
    -- (3,2),
    -- (1,3),
    -- (2,3),
    -- (3,3);


COMMIT;