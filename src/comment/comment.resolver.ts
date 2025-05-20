import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IComment } from 'domain/model/comment.model';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.input.dto';
import { ICommentService } from './comment.service.interface';

@ApiTags('User Comments')
@ApiBearerAuth()
@Resolver(() => IComment)
@UseGuards(StaffGuard)
export class CommentResolver {
  constructor(private readonly commentService: ICommentService) {}

  @Query(() => [IComment], { name: 'comments' })
  async fetchAll(): Promise<IComment[]> {
    return this.commentService.fetchAll();
  }

  @Query(() => IComment, { name: 'comment', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<IComment> {
    return this.commentService.fetchOne(id);
  }

  @Mutation(() => IComment)
  async createComment(@Args('data') data: CreateCommentDTO): Promise<IComment> {
    return this.commentService.add(data);
  }

  @Mutation(() => IComment)
  async updateComment(@Args('data') data: UpdateCommentDTO): Promise<IComment> {
    return this.commentService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeComment(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.commentService.remove(id);
  }
}
