const { performance } = require("perf_hooks");

class Timing {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  start() {
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
  }

  toHumanReadableTime() {
    const totalSeconds = (this.endTime - this.startTime) / 1000;

    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);

    return `${totalSeconds} => (${mins}m${secs}s)`;
  }
}

module.exports = Timing;
