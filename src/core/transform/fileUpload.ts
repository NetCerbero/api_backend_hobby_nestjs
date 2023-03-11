import { extname } from 'path';

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
    return callback(new Error('Archivo no permitido!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(20)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${Date.now()}-${randomName}${fileExtName}`);
};

export const typeFile = (extension) => {
  if (
    ['.png', '.PNG', '.jpeg', '.JPEG', '.jpg', '.JPG', '.svg', '.SVG'].includes(
      extension,
    )
  ) {
    return 'IMAGEN';
  } else if (
    extension == '.mp4' ||
    extension == '.MP4' ||
    extension == '.mpeg-4' ||
    extension == '.MPEG-4'
  ) {
    return 'VIDEO';
  } else {
    return 'ARCHIVO DESCONOCIDO';
  }
};
