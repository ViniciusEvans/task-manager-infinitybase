export function file2Buffer(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const readFile = (event: EventInit) => {
      const buffer = reader.result;
      resolve(buffer);
    };
    reader.addEventListener('load', readFile);
    reader.readAsArrayBuffer(file);
  });
}