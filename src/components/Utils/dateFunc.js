let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getDateFunc = (date) => {
  return `${months[new Date(date).getMonth()]}, ${
    days[new Date(date).getDay()]
  } ${new Date(date).getFullYear()}, ${new Date(date).toLocaleTimeString(
    "en-US"
  )}`;
};
