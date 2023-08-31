export function isMale(name: string) {
  const lowercaseName = name.toLowerCase();
  return lowercaseName.endsWith("o") || lowercaseName.endsWith("e");
}
