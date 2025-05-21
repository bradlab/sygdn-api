import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IComment } from 'domain/model/comment.model';
import { GqlAuthGuard } from 'adapter/guard/auth.guard';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.input.dto';
import { ICommentService } from './comment.service.interface';
import { CommentEntity } from 'framework/schema/comment.entity';

@ApiTags('User Comments')
@ApiBearerAuth()
@Resolver(() => CommentEntity)
@UseGuards(GqlAuthGuard)
export class CommentResolver {
  constructor(private readonly commentService: ICommentService) {}

  @Query(() => [CommentEntity], { name: 'comments' })
  async fetchAll(): Promise<IComment[]> {
    return this.commentService.fetchAll();
  }

  @Query(() => CommentEntity, { name: 'comment', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<IComment> {
    return this.commentService.fetchOne(id);
  }

  @Mutation(() => CommentEntity)
  async createComment(@Args('data') data: CreateCommentDTO): Promise<IComment> {
    return this.commentService.add(data);
  }

  @Mutation(() => CommentEntity)
  async updateComment(@Args('data') data: UpdateCommentDTO): Promise<IComment> {
    return this.commentService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeComment(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.commentService.remove(id);
  }
}
