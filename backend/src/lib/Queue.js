import Bee from 'bee-queue';

import newDeliveryMail from '../app/jobs/newDeliveryMail';

import redisConfig from '../config/redis';

const jobs = [newDeliveryMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      console.log('Processing...', job.handle);
      const { bee, handle } = this.queues[job.key];

      bee.on('fail', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name} FAILED:\n`, err);
  }
}

export default new Queue();
