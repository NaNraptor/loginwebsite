module.exports = {
    login: 'SELECT "id", "password", "group" FROM "users" WHERE "username"=$1',
    user_group: 'SELECT "access_rank" FROM "groups" WHERE "id"=$1',
    banned: 'SELECT "reason" FROM "bans" WHERE "user_id"=$1'
}