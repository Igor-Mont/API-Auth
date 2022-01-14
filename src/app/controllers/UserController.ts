import { Request, Response } from "express";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

class UserController {

  verify(request: Request, response: Response) {
    return response.send({ userId: request.userId, message: "Authenticated" });
  }

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      email,
      password
    });

    return response.status(201).json(user);
  }
}

// singleton
export default new UserController();