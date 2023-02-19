create TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    last_name VARCHAR(255),
    is_activated BOOLEAN,
    register_path VARCHAR,
    email VARCHAR,
    access_token VARCHAR,
    refreshT_token VARCHAR
)


CREATE TABLE Option(
 id serial PRIMARY KEY,
 option_id INT NOT NULL,
 option jsonb,
 FOREIGN KEY (option_id)
   REFERENCES user_db(id)
)