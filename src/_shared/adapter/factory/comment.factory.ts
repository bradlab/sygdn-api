import { IComment, OComment } from 'domain/model/comment.model';
import { ICreateCommentDTO } from 'comment/comment.service.interface';
import { StaffFactory } from './user.factory';
import { Staff } from 'domain/model/staff.model';
import { Dossier } from 'domain/model/dossier.model';

export class CommentFactory {
  static create(data: ICreateCommentDTO, staff: Staff, dossier: Dossier): IComment {
    const comment = new IComment();

    comment.content = data.content;
    comment.dossier = dossier;
    comment.staff = staff;

    return comment;
  }

  static getComment(comment: IComment): OComment {
    return {
      id: comment.id,
      content: comment.content,
      dossier: comment.dossier,
      staff: StaffFactory.getUser(comment.staff) as Staff,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
