import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { IDParamDTO, IDsParamDTO } from 'adapter/param.dto';
import { OUser } from 'domain/model/staff.model';
import { IUserService } from './user.service.interface';
import { DocUserDTO } from 'auth/doc.user.dto';
import { RegisterUserDTO, UpdateUserDTO, UserQueryDTO } from './user.input.dto';
import { StaffFactory } from 'adapter/factory/user.factory';
import { StaffGuard } from 'adapter/guard/auth.guard';

@UseGuards(StaffGuard)
@ApiTags('Staff or Admin')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  // @HasPermission(RuleEnum.CAN_SHOW_STAFF_LIST)
  @Get()
  @ApiOperation({
    summary: 'Users list',
    description: 'Fetch all users in the DB',
  })
  @ApiResponse({ type: DocUserDTO, isArray: true })
  async all(@Query() param: UserQueryDTO): Promise<OUser[]> {
    if (param && typeof param.ids === 'string') param.ids = [param.ids];
    const users = await this.userService.fetchAll(param);
    return users.map((user) => StaffFactory.getUser(user));
  }

  @Get('search')
  @ApiOperation({
    summary: 'Single account',
    description: 'Fetch the staff account by some of its informations',
  })
  @ApiQuery({
    type: String,
    description: 'email of the auth staff',
    required: false,
  })
  @ApiQuery({
    type: String,
    description: 'phone number of the auth staff',
    required: false,
  })
  @ApiResponse({ type: DocUserDTO })
  async search(@Query() param: UserQueryDTO): Promise<OUser> {
    if (param) {
      return StaffFactory.getUser(
        await this.userService.search(param, undefined),
      );
    }
    return null as unknown as OUser;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'One User',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed clinic',
  })
  @ApiResponse({ type: DocUserDTO })
  async show(@Param() { id }: IDParamDTO): Promise<OUser> {
    return StaffFactory.getUser(await this.userService.fetchOne(id));
  }

  /**
   * @method POST
   */

  @Post()
  // @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create account user',
    description:
      'As a partner of the project, you can create user as employee for your business',
  })
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ type: DocUserDTO })
  async create(@Body() data: RegisterUserDTO): Promise<OUser> {
    // data.password = DataGenerator.randomString();
    const user = await this.userService.add(data);
    if (user) return { ...StaffFactory.getUser(user), password: data.password };
    return null as unknown as OUser;
  }

  /**
   * @method PATCH
   */

  @Patch()
  // @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ type: DocUserDTO })
  async update(@Body() data: UpdateUserDTO): Promise<OUser> {
    return StaffFactory.getUser(await this.userService.edit(data));
  }

  @Patch('state')
  @ApiOperation({ summary: "Modification d'état des utilisateurs" })
  @ApiBody({
    type: IDsParamDTO,
    description: 'Id des utilisateurs concernés',
  })
  @ApiResponse({ type: Boolean })
  async setState(@Body() { ids }: IDsParamDTO): Promise<boolean> {
    if (ids) {
      if (ids && typeof ids === 'string') ids = [ids];
      return await this.userService.setState(ids);
    }
    return false;
  }

  /**
   * @method DELETE
   */

  @Delete('clean')
  @ApiOperation({ summary: 'Clean removed Accounts' })
  @ApiResponse({ type: Boolean })
  clean(): Promise<boolean> {
    return this.userService.clean();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Account' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the staff to remove',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.userService.remove(id);
  }
}
