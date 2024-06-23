import { Subject } from 'rxjs';

export class AppService {
  private shutdownListener$: Subject<void> = new Subject();

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  shutdown() {
    this.shutdownListener$.next();
  }
}
