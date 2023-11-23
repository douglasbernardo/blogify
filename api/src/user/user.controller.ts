import {Body, Controller, Get, Post, Patch, Request} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "../dto/user.dto";
import {editDto} from "../dto/edit_user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/new_user')
  addUser(@Body() userData: UserDto){
    return this.userService.add_user(userData)
  }

  @Get('/all_users')
  allUsers(){
    return this.userService.get_all_users()
  }

  @Post()
  getUser(@Request() req){
    return this.userService.find_user(req.body.currentEmail)
  }

  @Post('/edit_user')
  editUser(@Body() editDto: editDto){
    return this.userService.edit_user(editDto)
  }

  @Post('/delete_account')
  deleteUser(@Request() req){
    return this.userService.delete_account(req.body.currentEmail)
  }
}