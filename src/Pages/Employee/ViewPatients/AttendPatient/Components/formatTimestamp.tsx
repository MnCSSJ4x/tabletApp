export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // You can adjust the format as needed
};

export const formatTimestampforTitle = timestamp => {
  // Extract date and time components
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(5, 7);
  const day = timestamp.substring(8, 10);
  const time = timestamp.substring(10, 18);
  return `${year}-${month}-${day} ${time}`; // Add a closing backtick here
};