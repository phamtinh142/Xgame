import {
  ModifyResult,
  UpdateQuery,
  ObjectId,
  FilterQuery,
  ProjectionType,
  QueryWithHelpers,
  QueryOptions,
  UpdateWriteOpResult,
} from 'mongoose';

export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<any>;

  findOneById(id: string, projection?: string): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<QueryWithHelpers<T[], T>>;

  count(filter?: FilterQuery<T>): Promise<QueryWithHelpers<number, T>>;

  update(id: string, dto: Partial<T>): Promise<T>;

  updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateWriteOpResult>;

  updateOneById(id: string, update: UpdateQuery<T>, options?: QueryOptions<T> | null): Promise<UpdateWriteOpResult>;

  findOneAndUpdate(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateWriteOpResult>;

  findOne(filter?: FilterQuery<T>, projection?: ProjectionType<T> | null, options?: QueryOptions<T> | null): Promise<T>;

  findByIdAndUpdate(
    id: ObjectId | any,
    update: UpdateQuery<T>,
    options?: QueryOptions<T> & { rawResult: true },
  ): Promise<ModifyResult<any>>;
}
