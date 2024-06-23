import { OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';

export class AppService implements OnModuleDestroy {
  private shutdownListener$: Subject<void> = new Subject();

  onModuleDestroy() {
    throw new Error('Shutdown this pod to create a new pod!');
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  shutdown() {
    this.shutdownListener$.next();
  }
}
