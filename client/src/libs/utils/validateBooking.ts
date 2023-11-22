import { Dayjs } from "dayjs";

export const validateBooking = (
  checkInDate: Dayjs | null,
  checkOutDate: Dayjs | null,
) => {
  return !(
    !checkInDate ||
    !checkOutDate ||
    checkOutDate <= checkInDate ||
    checkOutDate.diff(checkInDate, "d") > 3
  );
};
