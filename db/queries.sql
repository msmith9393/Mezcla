-- https://dbdiagram.io/d/5f5c214310a0a51c74d4b75f

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    language CHARACTER (2),
    email VARCHAR (255), -- how to save emails
    password VARCHAR (255), -- how to save passwords
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, language, email, password) VALUES ('Megan', 'Smith', 'en', 'megan@tokaypress.com', 'password*60');

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR (255),
    description TEXT, -- add max
    instructions TEXT, -- add max
    ingredients TEXT, -- add max
    active_time VARCHAR (255),
    total_time VARCHAR (255),
    serves VARCHAR (255),
    level VARCHAR (255),
    image VARCHAR (255),
    slug VARCHAR (255),
    language CHARACTER (2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT recipe_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (id)
);

INSERT INTO recipes (name, user_id, image, language, slug, active_time, total_time, serves, level, description, instructions, ingredients) VALUES ('Strawberry Tart', 1, 'strawberry-tart.jpg', 'en', 'strawberry-tart', '1 hour', '4 hours', '8', 'Intermediate', 'This is a summary written by the author. Perhaps a story about the recipe or maybe an experience while eating this recipe.', 'In a food processor, combine the flour, sugar and salt. Add the butter and toss to coat in the flour mixture. Pulse the butter and the dry ingredients until only pea-sized chunks of butter remain. Add the water, a little at a time, and pulse just until the dough begins to come together. Remove the dough to a floured board and shape into a disk. Wrap in plastic and refrigerate until chilled, 2 hours.\nRoll out the dough into a thirteen inch circle. Transfer to a 9 1/2 inch tart pan with a removable bottom. Fit the dough nicely into the pan, fitting it snuggly into the bottom and up the sides, but don’t stretch the dough. Trim the edge leaving a 1/2 inch overhang. Fold the overhang over itself and press it onto the sides of the pan, creating a strong border to hold the cream for the tart. Loosely cover with plastic and freeze until firm, 30 minutes.', '1 cup flour\n2 cups sugar');
INSERT INTO recipes (name, user_id, image, language, slug, active_time, total_time, serves, level, description, instructions, ingredients) VALUES ('Banana Bread', 1, 'banana-bread.jpg', 'en', 'banana-bread', '1 hour', '4 hours', '8', 'Intermediate', 'This is a summary written by the author. Perhaps a story about the recipe or maybe an experience while eating this recipe.', 'In a food processor, combine the flour, sugar and salt. Add the butter and toss to coat in the flour mixture. Pulse the butter and the dry ingredients until only pea-sized chunks of butter remain. Add the water, a little at a time, and pulse just until the dough begins to come together. Remove the dough to a floured board and shape into a disk. Wrap in plastic and refrigerate until chilled, 2 hours.\nRoll out the dough into a thirteen inch circle. Transfer to a 9 1/2 inch tart pan with a removable bottom. Fit the dough nicely into the pan, fitting it snuggly into the bottom and up the sides, but don’t stretch the dough. Trim the edge leaving a 1/2 inch overhang. Fold the overhang over itself and press it onto the sides of the pan, creating a strong border to hold the cream for the tart. Loosely cover with plastic and freeze until firm, 30 minutes.', '1 cup flour\n2 cups sugar');
INSERT INTO recipes (name, user_id, image, language, slug, active_time, total_time, serves, level, description, instructions, ingredients) VALUES ('Pecan Dreams', 1, 'pecan-dreams.jpg', 'en', 'pecan-dreams', '1 hour', '4 hours', '8', 'Intermediate', 'This is a summary written by the author. Perhaps a story about the recipe or maybe an experience while eating this recipe.', 'In a food processor, combine the flour, sugar and salt. Add the butter and toss to coat in the flour mixture. Pulse the butter and the dry ingredients until only pea-sized chunks of butter remain. Add the water, a little at a time, and pulse just until the dough begins to come together. Remove the dough to a floured board and shape into a disk. Wrap in plastic and refrigerate until chilled, 2 hours.\nRoll out the dough into a thirteen inch circle. Transfer to a 9 1/2 inch tart pan with a removable bottom. Fit the dough nicely into the pan, fitting it snuggly into the bottom and up the sides, but don’t stretch the dough. Trim the edge leaving a 1/2 inch overhang. Fold the overhang over itself and press it onto the sides of the pan, creating a strong border to hold the cream for the tart. Loosely cover with plastic and freeze until firm, 30 minutes.', '1 cup flour\n2 cups sugar');

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER,
    value VARCHAR (255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tags_recipe_id
        FOREIGN KEY (recipe_id)
        REFERENCES recipes (id)
);

INSERT INTO tags (recipe_id, value) VALUES (1, 'dessert');
INSERT INTO tags (recipe_id, value) VALUES (2, 'dessert');
INSERT INTO tags (recipe_id, value) VALUES (3, 'dessert');
INSERT INTO tags (recipe_id, value) VALUES (1, 'fruit');
INSERT INTO tags (recipe_id, value) VALUES (2, 'fruit');

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER,
    user_id INTEGER,
    review INTEGER,
    comment TEXT, -- add max
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_review_lower CHECK (review > 0),
    CONSTRAINT valid_review_upper CHECK (review < 6),
    CONSTRAINT reviews_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT reviews_recipe_id
        FOREIGN KEY (recipe_id)
        REFERENCES recipes (id)
);

INSERT INTO reviews (recipe_id, user_id, review, comment) VALUES (2, 1, 5, 'delicious!');

CREATE TABLE liked (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER,
    user_id INTEGER,
    value BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT liked_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT liked_recipe_id
        FOREIGN KEY (recipe_id)
        REFERENCES recipes (id)
);

INSERT INTO liked (recipe_id, user_id, value) VALUES (1, 1, true);
INSERT INTO liked (recipe_id, user_id, value) VALUES (2, 1, true);
INSERT INTO liked (recipe_id, user_id, value) VALUES (3, 1, false);
