import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './stores.schema';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(storeData: CreateStoreDto) {
    const createdStore = new this.storeModel(storeData);
    return createdStore.save();
  }

  async findAll() {
    const createdStores = await this.storeModel.find({});
    return createdStores;
  }

  async findOne(id: string) {
    const createdStore = await this.storeModel.findById(id);

    if (!createdStore) {
      throw new NotFoundException();
    }

    return createdStore;
  }

  async updateOne(id: string, updateStoreData: UpdateStoreDto) {
    const createdStore = await this.storeModel.findByIdAndUpdate(
      id,
      updateStoreData,
      { new: true },
    );

    if (!createdStore) {
      throw new NotFoundException();
    }

    return createdStore;
  }

  async remove(id: string) {
    const createdStore = await this.storeModel.findByIdAndDelete(id);

    if (!createdStore) {
      throw new NotFoundException();
    }

    return { message: 'This store is deleted successfully' };
  }
}
