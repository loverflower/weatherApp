import { NAME_BOOKMARKED_CITIES_STORAGE } from "../configuration/config";
import { FormattedFormResultType } from "../types/commonTypes";

export const setBookmarkedCities = (
  bookMarkedCities: FormattedFormResultType[]
) => {
  localStorage.setItem(
    NAME_BOOKMARKED_CITIES_STORAGE,
    JSON.stringify(bookMarkedCities)
  );
};

export const getBookmarkedCities = () => {
  const result: any = localStorage.getItem(NAME_BOOKMARKED_CITIES_STORAGE);
  const finalResult: FormattedFormResultType[] = JSON.parse(result);

  return finalResult;
};
