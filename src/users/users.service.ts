import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    await this.validateUserExists(createUserDto.username)

    const user = new this.userModel(createUserDto);
    user.password = bcrypt.hashSync(user.password, 8);
    return await user.save()
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByLogin(username: string): Promise<User | undefined> {
    return await this.FindOneByUsername(username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({
      _id: id
    })
    .exec();
  }

  private async validateUserExists(username: string) {
    var userAlreadyExists = await this.FindOneByUsername(username);
    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }
  }

  private async FindOneByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }
}
