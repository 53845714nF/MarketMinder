CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for user
CREATE TABLE "user" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(1000) UNIQUE NOT NULL,
    password VARCHAR(164) NOT NULL
);

-- Table for shopping list
CREATE TABLE shopping_list (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(1000) NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES "user"(id)
        ON DELETE CASCADE
);

-- Table for items
CREATE TABLE item (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(1000) UNIQUE NOT NULL,
    done BOOLEAN DEFAULT FALSE NOT NULL,
    amount INTEGER DEFAULT 1 NOT NULL,
    shopping_list_id UUID NOT NULL,
    CONSTRAINT fk_shopping_list
        FOREIGN KEY(shopping_list_id)
        REFERENCES shopping_list(id)
        ON DELETE CASCADE
);

-- Association table for user and shopping list many-to-many relationship
CREATE TABLE user_shoppinglist_association (
    user_id UUID NOT NULL,
    shopping_list_id UUID NOT NULL,
    PRIMARY KEY (user_id, shopping_list_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES "user"(id),
    CONSTRAINT fk_shopping_list
        FOREIGN KEY(shopping_list_id)
        REFERENCES shopping_list(id)
);