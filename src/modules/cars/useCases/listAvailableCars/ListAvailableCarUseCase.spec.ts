import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      brand: "Test",
      category_id: "category_id",
      daily_rate: 100,
      description: "Carro de teste",
      fine_amount: 50,
      license_plate: "ABC-0000",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      brand: "Car_test",
      category_id: "category_id",
      daily_rate: 100,
      description: "Carro de teste",
      fine_amount: 50,
      license_plate: "ABC-0000",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_test",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car 01",
      brand: "Car_test",
      category_id: "category_id",
      daily_rate: 100,
      description: "Carro de teste",
      fine_amount: 50,
      license_plate: "ABC-0000",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Test car 01",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car 01",
      brand: "Car_test",
      category_id: "1998",
      daily_rate: 100,
      description: "Carro de teste",
      fine_amount: 50,
      license_plate: "ABC-0000",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1998",
    });
    expect(cars).toEqual([car]);
  });
});
