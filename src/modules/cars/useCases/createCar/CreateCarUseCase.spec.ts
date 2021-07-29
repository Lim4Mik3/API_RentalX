import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      brand: "Car Brand",
      category_id: "12345",
      daily_rate: 100,
      description: "This is a test car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able create two cars with same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        brand: "Car Brand",
        category_id: "12345",
        daily_rate: 100,
        description: "This is a test car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        brand: "Car Brand",
        category_id: "12345",
        daily_rate: 100,
        description: "This is a test car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Car created should have the availability property as true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      brand: "Car Brand",
      category_id: "12345",
      daily_rate: 100,
      description: "This is a test car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car.available).toBe(true);
  });
});
