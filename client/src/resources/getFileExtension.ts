export function getFileExtension(value: File) {
  const fileType = value.type.split('/')[1].toUpperCase();
  return fileType;
}
