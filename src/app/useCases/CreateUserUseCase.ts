import { getRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { User } from "../models/User";

interface IRequest {
  email: string;
  password: string;
}

class CreateUserUseCase {

  async execute({ email, password}: IRequest) {
    const repository = getRepository(User);

    const userExists = await repository.findOne({ email });

    if(userExists) throw new AppError("User already exists!", 409);

    const user = repository.create({
      email,
      password
    });

    await repository.save(user);

    return user;
  }
}

export { CreateUserUseCase };