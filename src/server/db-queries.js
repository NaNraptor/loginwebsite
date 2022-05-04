module.exports = {
    login: 'SELECT "id", "password", "group" FROM "users" WHERE "username"=$1',
    user_group: 'SELECT "access_rank" FROM "groups" WHERE "id"=$1',
    banned: 'SELECT "reason" FROM "bans" WHERE "user_id"=$1',
    name_taken: 'SELECT "username" FROM "users" WHERE "username"=$1',
    signup: 'INSERT INTO "users"("id", "username", "password", "date_created", "first_name", "last_name", "email", "post_code", "notes", "group") VALUES ($1, $2, $3, to_timestamp($4), $5, $6, $7, $8, $9, DEFAULT)'
}