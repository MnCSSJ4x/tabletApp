export function calculateAge(dobStr: string): number {
  // Parse the DOB string to extract day, month, and year
  const parts: string[] = dobStr.split('/');
  const day: number = parseInt(parts[0]);
  const month: number = parseInt(parts[1]) - 1; // Month is zero-based
  const year: number = parseInt(parts[2]);

  // Create a Date object from the components
  const dob: Date = new Date(year, month, day);

  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the difference between current date and DOB
  let age: number = currentDate.getFullYear() - dob.getFullYear();
  const monthDiff: number = currentDate.getMonth() - dob.getMonth();

  // Adjust age if birth month has not been reached yet in current year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}
