import { Request, Response, NextFunction } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../domain/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const mockUserService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UserService;

  beforeEach(() => {
    userController = new UserController(mockUserService);
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn() as NextFunction;
  });

  describe('getAll', () => {
    test('should return status 200 and users array', async () => {
      const user1: User = {
        id: 1,
        username: 'jaggervlad',
        name: 'Sebastian Acosta',
        status: 1,
        created_at: new Date('2024-04-26T11:21:14.000Z'),
        updated_at: new Date('2024-04-26T11:21:14.000Z'),
      };
      const user2: User = {
        id: 2,
        username: 'cgkarla',
        name: 'Karlita Caldas',
        status: 1,
        created_at: new Date('2024-04-26T11:21:41.000Z'),
        updated_at: new Date('2024-04-26T11:27:55.000Z'),
      };

      (mockUserService.getAll as jest.Mock).mockResolvedValue([user1, user2]);

      await userController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        error: null,
        data: [user1, user2],
      });
    });
  });
});
