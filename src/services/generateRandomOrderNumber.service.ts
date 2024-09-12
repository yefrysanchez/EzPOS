function generateRandomOrderNumber(): string {
  // Generate three random digits
  const digits = Math.floor(100 + Math.random() * 900);

  // Generate a random letter (A-Z)
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = letters.charAt(
    Math.floor(Math.random() * letters.length)
  );

  // Combine the digits and letter
  const orderNumber = `${digits}${randomLetter}`;

  return orderNumber;
}

export default generateRandomOrderNumber;
