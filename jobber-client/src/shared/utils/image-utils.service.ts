export const validateImage = (file: File, type: string): boolean => {
  if (type === 'image') {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return file && validImageTypes.indexOf(file.type) > -1;
  } else {
    const validVideoTypes = ['video/m4v', 'video/avi', 'video/mpg', 'video/mp4', 'video/webm'];
    return file && validVideoTypes.indexOf(file.type) > -1;
  }
};

export const checkImageSize = (file: File, type: string): string => {
  let fileError = '';
  const isValid = validateImage(file, type);
  if (!isValid) {
    fileError = `File ${file.name} not accepted`;
  }
  if (file.size > 50000000) {
    // 50 MB
    fileError = 'File is too large.';
  }
  return fileError;
};

export const checkImage = (file: File, type: string): boolean => {
  let isValid = true;
  if (!validateImage(file, type)) {
    window.alert(`File ${file.name} not accepted`);
    isValid = false;
    return false;
  }
  if (checkImageSize(file, type)) {
    window.alert(checkImageSize(file, type));
    isValid = false;
    return false;
  }
  return isValid;
};

export const checkFile = (file: File): boolean => {
  let hasError = false;
  if (file.size > 1000000000) {
    // 1 GB
    window.alert('File is too large. Max. size is 1 GB.');
    hasError = true;
  }
  if (!file.name.match(/\.(jpg|jpeg|png|gif|pdf|webp|zip|m4v|avi|mpg|mp4|webm)$/)) {
    window.alert('Only files of type jpg, jpeg, png, gif or pdf are allowed');
    hasError = true;
  }
  return hasError;
};

export const checkUrlExtension = (fileExtension: string): string => {
  let fileType = '';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
    fileType = 'image';
  }

  if (['pdf'].includes(fileExtension)) {
    fileType = 'pdf';
  }

  if (['m4v', 'avi', 'mpg', 'mp4', 'webm'].includes(fileExtension)) {
    fileType = 'video';
  }

  if (['zip'].includes(fileExtension)) {
    fileType = 'zip';
  }
  return fileType;
};

export const fileType = (file: File): string => {
  const list: string[] = file.name.split('.');
  const fileType: string = list[list.length - 1];
  return fileType;
};

export const readAsBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  const reader: FileReader = new FileReader();
  const fileValue: Promise<string | ArrayBuffer | null> = new Promise((resolve, reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', (event: ProgressEvent<FileReader>) => {
      reject(event);
    });

    reader.readAsDataURL(file);
  });
  return fileValue;
};
