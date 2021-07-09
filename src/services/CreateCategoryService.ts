import { CategoriesRepository } from "../repositories/CategoriesRepository";

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists, plese give another name!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
