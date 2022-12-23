export const deleteInMap = <T extends { [id: string]: any }>(
  map: T,
  id: string
): T => {
  const newMap = { ...map };
  delete newMap[id];
  return newMap;
};
