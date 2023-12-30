import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsDto } from 'src/dto/comments.dto';
import { Comments } from 'src/schemas/comments.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private comment: Model<Comments>,
    private userService: UserService,
  ) {}

  async createComment(data: CommentsDto): Promise<Comments> {
    console.log(data);
    if (!data) {
      throw new UnauthorizedException('Falha ao comentar');
    }
    return new this.comment({
      author: data.author,
      emailAuthor: data.emailAuthor,
      text: data.text,
      idArticle: data.idArticle,
    }).save();
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
              authorName: '$authorDetails.name', // Pegar o nome do usuário
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
}
