export interface IUseCaseFactory<
  CreateType,
  UpdateType,
  DeleteType,
  GetByIdType,
  GetAllType,
> {
  createUseCase(): CreateType;
  updateUseCase(): UpdateType;
  deleteUseCase(): DeleteType;
  getByIdUseCase(): GetByIdType;
  getAllUseCase(): GetAllType;
}
