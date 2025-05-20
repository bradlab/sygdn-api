import { IComment } from 'domain/model/comment.model';

export interface ICreateCommentDTO {
  content: string;
  dossierId: string;
  staffId: string;
}

export interface IUpdateCommentDTO extends Partial<ICreateCommentDTO> {
  id: string;
}

export abstract class ICommentService {
  abstract add(data: ICreateCommentDTO): Promise<IComment>;
  abstract fetchOne(id: string): Promise<IComment>;
  abstract fetchAll(): Promise<IComment[]>;
  abstract edit(data: IUpdateCommentDTO): Promise<IComment>;
  abstract remove(id: string): Promise<boolean>;
}
