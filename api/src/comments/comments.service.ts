import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsDto } from 'src/dto/comments.dto';
import { Comments } from 'src/schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments.name) private comment: Model<Comments>) {}

  async createComment(data: CommentsDto) {
    if (!data) {
      throw new UnauthorizedException('Falha ao comentar');
    }
    // console.log(data);

    // const find_my_comments = await this.comment.find({
    //   emailAuthor: data.emailAuthor,
    // });
    // if (find_my_comments.length >= 1) {
    //   throw new UnauthorizedException(
    //     'Aviso: O número máximo de comentários permitidos por interação é três.',
    //   );
    // }
    return new this.comment({
      author: data.author,
      emailAuthor: data.emailAuthor,
      text: data.text,
      idArticle: data.idArticle,
    }).save();
  }

  async delete_my_comment(data): Promise<any> {
    return await this.comment.deleteOne({
      idArticle: data.idArticle,
      emailAuthor: data.user,
    });
  }

  async get_all_comments(id: string): Promise<any> {
    try {
      const commentsWithUserDetails = await this.comment
        .aggregate([
          // Filtrar os comentários pelo id do artigo
          { $match: { idArticle: id } },
          // Realizar um lookup para obter os detalhes do usuário
          {
            $lookup: {
              from: 'users', // Nome da coleção de usuários
              localField: 'emailAuthor',
              foreignField: 'email',
              as: 'authorDetails',
            },
          },
          // Desconstruir o array de resultados do lookup
          { $unwind: '$authorDetails' },
          // Projetar os campos desejados
          {
            $project: {
              _id: 0, // Omitir o _id se não for necessário
              text: 1, // Manter o texto do comentário
              createdAt: 1,
              authorName: '$authorDetails.name', // Pegar o nome do usuário
              authorEmail: '$authorDetails.email',
              authorImage: '$authorDetails.urlImage', // Pegar a URL da imagem do usuário
            },
          },
        ])
        .exec();
      return commentsWithUserDetails;
    } catch (error) {
      console.error('Erro ao obter comentários:', error);
      throw error;
    }
  }

  async get_all_my_comments(email: string) {
    try {
      const my_comments = await this.comment
        .find({ emailAuthor: email })
        .exec();
      return my_comments;
    } catch (error) {
      console.log(error);
    }
  }

  async edit_comment(data) {
    const comment = await this.comment.findOneAndUpdate(
      { emailAuthor: data.user },
      { $set: { text: data.text } },
    );
    console.log(comment);
    return comment;
  }
}
