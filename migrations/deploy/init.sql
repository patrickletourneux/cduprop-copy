-- Deploy c_du_props:init to pg

BEGIN;

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  pseudonym TEXT NOT NULL,
  avatar_img TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "home" ( 
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  password INT UNIQUE DEFAULT FLOOR (RANDOM()*(9999)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id INT NOT NULL REFERENCES "user"(id) 
);

CREATE TABLE "generic_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "home_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  home_id INT NOT NULL REFERENCES "home"(id) 
);

CREATE TABLE "done_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  home_id INT NOT NULL REFERENCES "home"(id) , 
  user_id INT NOT NULL REFERENCES "user"(id) 
);

CREATE TABLE "reward" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reward TEXT DEFAULT NULL,
  title TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  home_id INT REFERENCES "home"(id) NOT NULL
);

CREATE TABLE "attributed_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES "user"(id),
  home_id INT REFERENCES "home"(id)
);

COMMIT;
