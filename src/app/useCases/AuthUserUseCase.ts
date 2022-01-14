import { getRepository } from "typeorm";
import { compare } from "bcrypt";
import { AppError } from "../errors/AppError";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

class AuthUserUseCase {

  async execute({ email, password}: IRequest) {
    const repository = getRepository(User);

    const user = await repository.findOne({ email });

    if(!user) throw new AppError("Email or password invalid", 401);

    const matchPassword = compare(password, user.password);

    if(!matchPassword) throw new AppError("Email or password invalid", 401);
    
    const token = sign({ id: user.id }, "8cc5801266985f9ce44e736aee15f04d", {
      expiresIn: "1d"
    });

    delete user.password;
    
    return {
      user,
      token
    };
  }
}

export { AuthUserUseCase };