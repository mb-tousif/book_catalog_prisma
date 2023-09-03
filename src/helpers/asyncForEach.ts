import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AsyncForEach = async <T>(arr: Array<T>, cb: any) => {
  if (!Array.isArray(arr)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid array");
  }
  for (let index = 0; index < arr.length; index++) {
    await cb(arr[index], index, arr);
  }
};
