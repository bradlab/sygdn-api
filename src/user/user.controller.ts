import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { DataGenerator } from 'domain/generator/data.generator';
import { IDParamDTO, IDsParamDTO } from 'adapter/param.dto';
import { RuleEnum } from 'app/enum';
import { GetUser } from 'adapter/decorator';
import { OUser, Staff } from 'domain/model/staff.model';
import { IUserService } from './user.service.interface';
import { DocUserDTO } from 'auth/doc.user.dto';
import { RegisterUserDTO, UpdateUserDTO, UserQueryDTO } from './user.input.dto';
import { StaffFactory } from 'adapter/factory/user.factory';

@ApiTags('Staff or Admin')
@ApiBearerAuth()
@Controller('staff')
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
    name: 'email',
    description: 'email of the auth staff',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'phone',
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

  // @HasPermission(RuleEnum.CAN_SHOW_STAFF)
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
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create account user',
    description:
      'As a partner of the project, you can create user as employee for your business',
  })
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ type: DocUserDTO })
  async create(@Body() data: RegisterUserDTO): Promise<OUser> {
    data.password = DataGenerator.randomString();
    const user = await this.userService.add(data);
    if (user) return { ...StaffFactory.getUser(user), password: data.password };
    return null as unknown as OUser;
  }

  /**
   * @method PATCH
   */

  @Patch()
  // @HasPermission(RuleEnum.CAN_UPDATE_STAFF)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ type: DocUserDTO })
  async update(@Body() data: UpdateUserDTO): Promise<OUser> {
    return StaffFactory.getUser(await this.userService.edit(data));
  }

  @Patch('state')
  // @HasPermission(RuleEnum.CAN_SET_STAFF_STATE)
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
  // @HasPermission(RuleEnum.CAN_DELETE_STAFF)
  @ApiOperation({ summary: 'Clean removed Accounts' })
  @ApiResponse({ type: Boolean })
  clean(): Promise<boolean> {
    return this.userService.clean();
  }

  @Delete(':id')
  // @HasPermission(RuleEnum.CAN_DELETE_STAFF)
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
