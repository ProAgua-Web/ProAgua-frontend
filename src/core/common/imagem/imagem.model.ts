import { z } from 'zod';

export interface CreateImagem {
  file: File;
  description: string;
}

export interface ImageOut {
  id: string;
  src: string;
  description: string;
}

export type Imagem = CreateImagem | ImageOut;

const MAX_FILE_SIZE = 10000000;
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];

// const imageSchema = z.object({
//   image: z
//     .any()
//     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//     .refine(
//       (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
//       'Only .jpg, .jpeg, .png and .webp formats are supported.',
//     ),
// });

export const photographySchema = z.object({
  imagem: z
    .union([
      z
        .instanceof(File, { message: 'Image is required' })
        .refine(
          (file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE,
          `Max image size is ${MAX_FILE_SIZE}MB`,
        )
        .refine(
          (file) =>
            !file ||
            file.type === '' ||
            ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
          'Only .jpg, .jpeg, and .png formats are supported',
        ),
      z.string().optional(), // Allow the existing image URL for editing mode
    ])
    .refine((value) => value instanceof File || typeof value === 'string', {
      message: 'Image is required',
    }),
  description: z.string().optional(),
});

export type PhotographySchema = z.infer<typeof photographySchema>;
