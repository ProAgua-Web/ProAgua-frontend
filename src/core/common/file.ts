import { z } from 'zod';

export interface FileDescription {
  id: string;
  description: string;
  src: string;
}

export const fileDescriptionSchema = z.object({
  id: z.string(),
  src: z.string(),
  description: z.string(),
});

// const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export const documentSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.type),
    { message: 'Formato de arquivo inválido' },
  );

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    { message: 'Invalid image file type' },
  );

export const fileUploadSchema = documentSchema.or(imageSchema);
