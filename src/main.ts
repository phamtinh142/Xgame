import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@providers/logging/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@common/filter/exceptions.filter';
import { AppService } from './app.service';
import { RedisAdapter } from '@providers/socket/adapter/redis.adapter';
import { join } from 'path';
import { RedisConfigService } from '@configs/redis/redis.service';
import { AppConfigService } from '@configs/app/app.service';
import { create } from 'express-handlebars';
import * as session from 'express-session';
import * as passport from 'passport';
import { NextFunction, Response, Request } from 'express';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { UserInfo } from '@common/dto/user.dto';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const loggerService = app.get(LoggerService);
  const appService = app.get(AppService);
  const redisConfigService = app.get(RedisConfigService);
  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;

  const redisIoAdapter = new RedisAdapter(app, redisConfigService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  app.use(
    session({
      secret: 'some_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Xgame')
    .setDescription('Xgame')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  appService.subscribeToShutdown(async () => {
    await app.close();
    process.exit(0);
  });

  const hbs = create({
    extname: 'hbs',
    layoutsDir: join(process.cwd(), 'views', 'layouts'),
    partialsDir: [join(process.cwd(), 'views', 'partials')],
  });
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.useStaticAssets(join(process.cwd(), 'public'));

  app.use(csurf({ cookie: true }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const csrfToken = req.csrfToken();

    if (req.session && req.session['user']) {
      res.locals.user = req.session['user'];
      res.locals.checkLogin = !!req.session['user'];
      res.locals.permission = !!req.session['user'].permission;
    }

    res.locals.baseUrl = appConfigService.baseUrl;
    res.locals.url = req.originalUrl;
    res.locals._csrf = csrfToken;

    res.cookie('XSRF-TOKEN', csrfToken);

    return next();
  });

  await app.listen(appConfigService.port);

  loggerService.info(AppModule, `Application running on port ${port}`);
}

bootstrap().then();
