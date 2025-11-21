export const getAvatarPlaceholder = (
  firstName: string | null,
  lastName?: string | null
) => {
  if (firstName && lastName)
    return `${firstName.trim()[0]}${lastName.trim()[0]}`;
  if (firstName) return firstName.trim()[0];
  if (lastName) return lastName.trim()[0];
  return "";
};
