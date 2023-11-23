import {Injectable, UnauthorizedException} from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, userSchema} from "../schemas/user.schema";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService{
  constructor(
    @InjectModel(User.name)
    private user: Model<User>,
    private jwtService: JwtService
  ) {}
  async add_user(data): Promise<{access_token: string, user: User}>{
    if(await this.verify_existing_email(data.email)){
      throw new UnauthorizedException('E-mail already Exists');
    }
    const user= await new this.user({
      name: data.name,
      email: data.email,
      password: data.fromGoogle ? undefined : await bcrypt.hash(data.password, 14),
      fromGoogle: !!data.fromGoogle,
    }).save()
    const payload = { sub: data.email, username: data.name }
    return {
      user,
      access_token: await this.jwtService.signAsync(payload)
    }
  }
  async verify_existing_email(email): Promise<boolean>{
    return !!await this.user.findOne({email: email}).exec();
  }

  async find_user(email: string): Promise<User | undefined> {
    try{
      return await this.user.findOne({email: email}).exec()
    }catch (e) {
      throw new UnauthorizedException('E-mail not found',e)
    }
  }

  async edit_user(userData) {
    const user_editing = await this.user.findOne({email: userData.currentEmail})
    if (!user_editing) {
      throw new UnauthorizedException('E-mail does not exist');
    }
    if (userData.name !== '') {
      user_editing.name = userData.name;
    }

    if (userData.email !== '') {
      user_editing.email = userData.email;
    }

    if (userData.password !== '') {
      user_editing.password = bcrypt.hashSync(userData.password,14);
    }

    return await user_editing.save();
  }
  async get_all_users() {
    return this.user.find({}).exec()
  }

  async delete_account(email: string){
    return this.user.findOneAndDelete({email: email});
  }
}