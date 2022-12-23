import { IdItem } from '../interfaces/id-item.interface';

export const mapToArrayWithId = <
  T extends { [id: string]: any },
  U extends IdItem
>(
  map: T
): U[] => {
  return Object.keys(map).map((id) => ({ ...map[id], id }));
};
