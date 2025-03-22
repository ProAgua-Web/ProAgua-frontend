import { z } from 'zod';

export interface FileDescription {
  id: number;
  nome: string;
  tipo: string;
  url: string;
}

export const fileDescriptionSchema = z.object({
  id: z.number(),
  nome: z.string(),
  tipo: z.string(),
  url: z.string(),
});

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

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
    (file) =>
      [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
        'image/gif',
      ].includes(file.type),
    { message: 'Invalid image file type' },
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: 'File size should not exceed 5MB',
  });

export const fileUploadSchema = documentSchema.or(imageSchema);
