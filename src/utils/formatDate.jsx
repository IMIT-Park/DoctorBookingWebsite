export function formatDate(date) {
  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  let month = formattedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = formattedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

export function reverseFormatDate(date) {
  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  let month = formattedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = formattedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  return `${day}-${month}-${year}`;
}
