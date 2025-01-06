export function createUsername(fullName) {
  // Trim the input and handle cases with 2 characters
  const nameParts = fullName.trim().split(" ");

  let username = "";

  if (nameParts.length === 1 && nameParts[0].length <= 2) {
    // If the input is a single name with 2 or fewer characters, use the whole input
    username = nameParts[0].toLowerCase();
  } else {
    // Get the first initial and the last name for other cases
    const firstInitial = nameParts[0]?.charAt(0).toLowerCase() || "";
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : "";
    username = firstInitial + lastName;
  }

  // Remove any special characters from the username
  username = username.replace(/[^a-z0-9]/g, "");

  // Add a random 4-digit number at the end
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
  username += randomNum;

  return username;
}
