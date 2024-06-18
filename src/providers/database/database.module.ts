import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BetGameDoubleRepositotyInjectName,
  BetGameHiloRepositotyInjectName,
  BetGameX50RepositotyInjectName,
  GameDoubleRepositotyInjectName,
  GameHiloRepositotyInjectName,
  GameX50RepositotyInjectName,
  UserRepositotyInjectName,
} from '@providers/database/inject-name.constant';
import {
  BetGameDoubleRepository,
  BetGameHiloRepository,
  BetGameX50Repository,
  GameDoubleRepository,
  GameHiloRepository,
  GameX50Repository,
  UserRepository,
} from '../../schemas/repositories';
import {
  BetGameDouble,
  BetGameDoubleSchema,
  BetGameHilo,
  BetGameHiloSchema,
  BetGameX50,
  BetGameX50Schema,
  GameDouble,
  GameDoubleSchema,
  GameHilo,
  GameHiloSchema,
  GameX50,
  GameX50Schema,
  User,
  UserSchema,
} from '../../schemas';
import { DatabaseConfigModule } from '@configs/database/database.module';
import { DatabaseConfigService } from '@configs/database/database.service';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { AsyncModelFactory } from '@nestjs/mongoose/dist/interfaces/async-model-factory.interface';

const repositoryProviders = [
  { provide: BetGameDoubleRepositotyInjectName, useClass: BetGameDoubleRepository },
  { provide: BetGameHiloRepositotyInjectName, useClass: BetGameHiloRepository },
  { provide: BetGameX50RepositotyInjectName, useClass: BetGameX50Repository },
  { provide: GameDoubleRepositotyInjectName, useClass: GameDoubleRepository },
  { provide: GameHiloRepositotyInjectName, useClass: GameHiloRepository },
  { provide: GameX50RepositotyInjectName, useClass: GameX50Repository },
  { provide: UserRepositotyInjectName, useClass: UserRepository },
] as Provider[];

const databaseModels = [
  { name: BetGameDouble.name, useFactory: () => BetGameDoubleSchema },
  { name: BetGameHilo.name, useFactory: () => BetGameHiloSchema },
  { name: BetGameX50.name, useFactory: () => BetGameX50Schema },
  { name: GameDouble.name, useFactory: () => GameDoubleSchema },
  { name: GameHilo.name, useFactory: () => GameHiloSchema },
  { name: GameX50.name, useFactory: () => GameX50Schema },
  { name: User.name, useFactory: () => UserSchema },
] as AsyncModelFactory[];

@Module({
  imports: [
    MongooseModule.forFeatureAsync(databaseModels),
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (config: DatabaseConfigService) =>
        ({
          uri: config.databaseUri,
          dbName: config.databaseName,
        } as MongooseModuleFactoryOptions),
      inject: [DatabaseConfigService],
    }),
  ],
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class DatabaseModule {}
