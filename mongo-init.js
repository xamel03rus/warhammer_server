db.createUser(
    {
        user: "manager",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "warhammer"
            }
        ]
    }
);
db.createCollection('gameservers');