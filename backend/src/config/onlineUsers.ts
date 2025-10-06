const onlineUsers = new Set<string>();

export const addUser = (userId: string) => {
  onlineUsers.add(userId);
};

export const removeUser = (userId: string) => {
  onlineUsers.delete(userId);
};

export const isUserOnline = (userId: string) => {
  return onlineUsers.has(userId);
};
