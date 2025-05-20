import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { UserModule } from 'user/user.module';
import { ICommentService } from './comment.service.interface';

@Module({
  imports: [UserModule],
    providers: [
      { provide: ICommentService, useClass: CommentService },
      CommentResolver,
    ],
    exports: [ICommentService],
})
export class CommentModule {}
