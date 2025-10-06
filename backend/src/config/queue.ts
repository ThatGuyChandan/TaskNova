import Job from '../interfaces/Job.js';

const queue: Job[] = [];

export const addJob = (job: Job) => {
  queue.push(job);
};

export const getJob = (): Job | undefined => {
  return queue.shift();
};
