import { PlaceType } from "../../types";

export const getPosition = (): Promise<GeolocationPosition> => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      const errCallback = () => rej('Unable to retrieve your location')
      navigator.geolocation.getCurrentPosition(res, errCallback);
    } else {
      rej("Geolocation is not supported by this browser.");
    }
  });
};


export const reorder = (list: PlaceType[], startIndex: number, endIndex: number): PlaceType[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, { ...removed, });

  return result;
};