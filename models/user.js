let users = [
    { id: 1, name: "Ali", age: 25 }
];

module.exports = {
    getAll: () => users,
    create: (user) => {
        user.id = users.length + 1;
        users.push(user);
        return user;
    },
    update: (id, updated) => {
        const index = users.findIndex(u => u.id == id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...updated };
        return users[index];
    },
    delete: (id) => {
        users = users.filter(u => u.id != id);
    }
};
