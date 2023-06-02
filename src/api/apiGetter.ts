import { Api, ApiConfig, IUser, RequestParams } from './Api';

export const getApi = (config: ApiConfig, params: RequestParams) => ({
  findPetsByStatus: (query: { status?: 'available' | 'pending' | 'sold' }) =>
    new Api(config).pet.findPetsByStatus(query, params),
  getPetById: (petId: number) => new Api(config).pet.getPetById(petId, params),
  createUser: (data: IUser) => new Api().user.createUser(data, params),
  loginUser: (query: { username?: string; password?: string }) => new Api(config).user.loginUser(query, params),
  logoutUser: () => new Api(config).user.logoutUser(params),
  getUserByName: (username: string) => new Api().user.getUserByName(username, params),
});
