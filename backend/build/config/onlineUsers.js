const onlineUsers = new Set();
export const addUser = (userId) => {
    onlineUsers.add(userId);
};
export const removeUser = (userId) => {
    onlineUsers.delete(userId);
};
export const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};
