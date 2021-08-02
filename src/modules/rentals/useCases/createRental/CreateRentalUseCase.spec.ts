import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositotyInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("Should be able create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able create a new rental to a user that already have a rental in progress", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "1235",
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able create a new rental to a car have a rental in progress", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "12345",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
