class WorkerPoolingService {
  workerSupported: boolean = !!window.Worker;
  workerURL: string = "";
  workerPool: Worker[] = [];
  constructor(workerURL: string) {
    this.workerURL = workerURL;
  }
  clearWorkerPool(): void {
    const numOfWorkers = this.workerPool.length;
    if (numOfWorkers > 0)
      for (let i = 0; i < numOfWorkers; i++) this.workerPool.pop()?.terminate();
  }
  jobPromise(args: any): Promise<any> {
    if (this.workerSupported) {
      this.clearWorkerPool();
      const worker: Worker = new Worker(this.workerURL);
      this.workerPool.push(worker);
      // console.log(`${this.workerURL} pool size: ${this.workerPool.length}`);
      return new Promise((resolve, reject) => {
        worker.postMessage(args);
        worker.onerror = reject;
        worker.addEventListener("message", ({ data }) => {
          resolve(data);
        });
      });
    } else {
      return new Promise((_, reject) =>
        reject("web workers not supported in your browser")
      );
    }
  }
}

export default WorkerPoolingService;
