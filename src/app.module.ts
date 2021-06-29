import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://alesandro:nodewithnest@cluster0.qeqne.mongodb.net/test'),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
