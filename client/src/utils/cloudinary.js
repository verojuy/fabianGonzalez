const CLOUD_NAME = "dmfdrpdu6";

/**
 * Genera una URL de Cloudinary optimizada
 * @param {string} publicId - El ID de la imagen
 * @param {object} options - Opciones como width, height, crop
 * @returns {string} URL completa
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  const { width, height, crop = "fill" } = options;
  
  let transformations = "f_auto,q_auto";
  
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (width || height) transformations += `,c_${crop}`;

  // Esto convierte espacios en %20 para que el navegador no de error 404
  const cleanId = publicId.split('/').map(segment => encodeURIComponent(segment)).join('/');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${cleanId}`;
};
