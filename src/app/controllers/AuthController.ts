import { Request, Response } from "express";
import { AuthUserUseCase } from "../useCases/AuthUserUseCase";

class AuthController {

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authUserUseCase = new AuthUserUseCase();

    const infos = await authUserUseCase.execute({
      email,
      password
    });

    return response.status(200).json(infos);
  }
}

// singleton
export default new AuthController();