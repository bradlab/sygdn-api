import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { UserModule } from 'user/user.module';
import { ICommentService } from './comment.service.interface';
import { CommentController } from './comment.controller';

@Module({
  imports: [UserModule],
    controllers: [CommentController],
    providers: [
      { provide: ICommentService, useClass: CommentService },
      CommentResolver,
    ],
    exports: [ICommentService],
})
export class CommentModule {}
