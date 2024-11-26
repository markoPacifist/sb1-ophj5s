export const hashPassword = async (password: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const comparePassword = async (password: string, storedPassword: string): Promise<boolean> => {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === storedPassword;
};