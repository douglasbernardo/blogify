// import { Test, TestingModule } from '@nestjs/testing';
// import { ArticleController } from './article.controller';
// import { ArticleService } from './article.service';
// describe('ArticleController', () => {
//   let articleController: ArticleController;
//   let articleService: ArticleService;
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ArticleController],
//       providers: [
//         {
//           provide: ArticleService,
//           useValue: {
//             threeLastAdded: jest.fn().mockResolvedValue([
//               {
//                 id: 'tal',
//                 title: 'tal',
//                 titleFont: 'tal',
//                 text: 'tal',
//                 fontText: 'blabla',
//                 category: 'blalbla',
//                 status: 'sbadfu',
//               },
//             ]),
//           },
//         },
//       ],
//     }).compile();

//     articleController = module.get<ArticleController>(ArticleController);
//     articleService = module.get<ArticleService>(ArticleService);
//   });

//   it('should fetch articles', () => {
//     expect(articleController).toBeDefined();
//   });

//   describe('get all articles', () => {
//     it('should return an article list', async () => {
//       const articles = await articleController.getArticles();

//       expect(articles).toBeDefined();
//     });
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            getArticles: jest.fn().mockResolvedValue([
              {
                id: 'tal',
                title: 'tal',
                titleFont: 'tal',
                text: 'tal',
                fontText: 'blabla',
                category: 'blalbla',
                status: 'sbadfu',
              },
            ]),
          },
        },
      ],
    }).compile();

    articleController = module.get<ArticleController>(ArticleController);
    articleService = module.get<ArticleService>(ArticleService);
  });

  it('should return an array of articles', async () => {
    const articles = await articleController.getArticles();
    expect(articles).toBeDefined(); // Verifica se há retorno
    expect(Array.isArray(articles)).toBe(true); // Verifica se é um array
    expect(articles.length).toBeGreaterThan(0); // Verifica se o array não está vazio
    // Verifica se o primeiro elemento do array é um objeto de artigo
    expect(typeof articles[0]).toBe('object');
    expect(articles[0]).toHaveProperty('title');
    expect(articles[0]).toHaveProperty('content');
    // Adicione mais verificações conforme necessário para os campos do objeto de artigo
  });
});
