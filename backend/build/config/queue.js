const queue = [];
export const addJob = (job) => {
    queue.push(job);
};
export const getJob = () => {
    return queue.shift();
};
