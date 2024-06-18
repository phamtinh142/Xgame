import { BaseRepositoryInterface } from './base.interface.repository';
import {
  FilterQuery,
  Model,
  ModifyResult,
  ProjectionType,
  QueryOptions,
  QueryWithHelpers,
  UpdateQuery,
  UpdateWriteOpResult,
  ObjectId,
} from 'mongoose';

export abstract class BaseRepositoryAbstract<T> implements BaseRepositoryInterface<T> {
  protected constructor(private readonly _model: Model<T>) {}

  async create(dto: T | any): Promise<any> {
    const created_data = await this._model.create(dto);
    return created_data.save();
  }

  async findOneById(id: string): Promise<T> {
    return this._model.findById(id);
  }

  async findOneByCondition(condition = {}): Promise<T> {
    return await this._model.findOne({ ...condition }).exec();
  }

  async find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<QueryWithHelpers<T[], T>> {
    return this._model.find(filter, projection, options);
  }

  async count(filter?: FilterQuery<T>): Promise<QueryWithHelpers<number, T>> {
    return this._model.countDocuments(filter);
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return this._model.findOneAndUpdate({ _id: id }, dto, {
      new: true,
    });
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> | any,
  ): Promise<UpdateWriteOpResult> {
    return this._model.updateOne(filter, update, options);
  }

  async updateOneById(
    id: string,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateWriteOpResult> {
    return this._model.findByIdAndUpdate(id, update, options);
  }

  async findOneAndUpdate(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateWriteOpResult> {
    return this._model.findOneAndUpdate(filter, update, options);
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null,
  ): Promise<T> {
    return this._model.findOne(filter, projection, options);
  }

  async findByIdAndUpdate(
    id: ObjectId | any,
    update: UpdateQuery<T>,
    options?: QueryOptions<T> & { rawResult: true },
  ): Promise<ModifyResult<any>> {
    return this._model.findByIdAndUpdate(id, update, options);
  }
}
