import { Service } from '@bluelibs/core';

@Service()
export class DataGridService {
  public mapApiDataToGridData<T extends { _id?: string }[]>(data: T) {
    return data.map(({ _id, ...item }) => ({
      id: _id,
      ...item,
    }));
  }
}
