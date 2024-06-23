import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@configs/app/app.service';

@Injectable()
export class LoggerService {
  private winstonLogger: winston.Logger;

  constructor(private _appConfigService: AppConfigService) {
    this.winstonLogger = winston.createLogger({
      level: this._appConfigService.logLevel,
      levels: winston.config.syslog.levels,
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf((info) => {
              const { timestamp, level, message } = info;

              const markerName = info.marker ? info.marker.name : 'unknown';
              const name = info.context ? info.context : markerName;

              const ts = timestamp.slice(0, 19).replace('T', ' ');
              return `${ts} [${level}] [${name}]: ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  debug(marker: any, message: string, args?: any): void {
    if (args) {
      this.winstonLogger.debug(message, { marker, args });
    } else {
      this.winstonLogger.debug(message, { marker });
    }
  }

  info(marker: any, message: string, args?: any): void {
    if (args) {
      this.winstonLogger.info(message, { marker, args });
    } else {
      this.winstonLogger.info(message, { marker });
    }
  }

  warn(marker: any, message: string, args?: any): void {
    if (args) {
      this.winstonLogger.warn(message, { marker, args });
    } else {
      this.winstonLogger.warn(message, { marker });
    }
  }

  error(marker: any, message: string, args?: any): void {
    if (args) {
      this.winstonLogger.error(message, { marker, args });
    } else {
      this.winstonLogger.error(message, { marker });
    }
  }
}
