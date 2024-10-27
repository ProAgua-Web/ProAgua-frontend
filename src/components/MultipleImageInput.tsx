import { useState } from 'react';
import ImageUploadModal from './ImageUploadModal';
import { ImageIn, ImageOut } from '@/utils/types';
import Modal from './Modal';

function ConfirmImageDeletionModal(props: {
  visible: boolean;
  confirmCallback: () => void;
  close: () => void;
}) {
  return (
    <Modal
      className="min-h-0 w-fit max-sm:h-fit max-sm:w-fit"
      title="Deseja confirmar a exclusão da imagem?"
      close={props.close}
      visible={props.visible}
    >
      <div className="flex w-full  gap-2">
        <button
          className="hover:boder-red-700 w-full rounded border border-neutral-600 bg-neutral-500 px-4 py-2 font-semibold text-white hover:bg-neutral-600"
          onClick={props.close}
          type="button"
        >
          Cancelar
        </button>

        <button
          className="hover:boder-red-700 w-full rounded border border-red-600 bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          onClick={() => {
            props.confirmCallback();
            props.close();
          }}
          type="button"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
}

function ImageSlot(props: {
  imageUrl: string;
  imageDescription: string;
  disabled?: boolean;
  onImageDeletion: () => void;
}) {
  return (
    <div
      key={props.imageUrl}
      className="group/image relative block w-fit flex-shrink-0 cursor-pointer rounded border border-transparent p-2 hover:border-blue-300 hover:bg-blue-300"
    >
      <button
        className="disabled: absolute right-0 top-0 hidden h-6 w-6 rounded-full border border-neutral-600 bg-white p-0 text-center align-middle font-semibold text-neutral-600 hover:bg-red-500 hover:text-white group-hover/image:block"
        type="button"
        onClick={props.onImageDeletion}
        disabled={props.disabled}
      >
        x
      </button>
      <img
        id="imagePreview"
        alt="Imagem Preview"
        src={props.imageUrl}
        className="block h-36 w-64 rounded border border-neutral-300 bg-neutral-200 object-cover"
      />
      <span className="block w-64 overflow-hidden text-ellipsis text-nowrap pt-2 text-center text-sm text-blue-950">
        {props.imageDescription}
      </span>
    </div>
  );
}

type MultipleImageInputProps = {
  existingImages?: ImageOut[];
  removeExistingImage?: (url: string) => void;
  images: ImageIn[];
  setImages: (image: ImageIn[]) => void;
  disabled?: boolean;
};

export default function MultipleImageInput({
  existingImages = [],
  removeExistingImage = (url: string) => {},
  images,
  setImages,
  disabled = false,
}: MultipleImageInputProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deletionModalVisible, setDeletionModalVisible] =
    useState<boolean>(false);
  const [deleteCallback, setDeleteCallback] = useState<() => void>(
    () => () => {},
  );

  const addImage = (file: File | null, description: string) => {
    if (file !== null) {
      const newImage = {
        src: '',
        file: file,
        description: description,
      };
      setImages([...images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.splice(index, 1));
  };

  let imageSlots = existingImages.map((image) => {
    const imageUrl = process.env.NEXT_PUBLIC_API_URL + image.src;

    return (
      <ImageSlot
        key={imageUrl}
        imageUrl={imageUrl}
        imageDescription={image.description}
        onImageDeletion={() => {
          setDeleteCallback(() => () => removeExistingImage(imageUrl));
          setDeletionModalVisible(true);
        }}
      />
    );
  });

  imageSlots = imageSlots.concat(
    images.map((image, index) => {
      const imageUrl = URL.createObjectURL(image.file);

      return (
        <ImageSlot
          key={imageUrl}
          imageUrl={imageUrl}
          imageDescription={image.description}
          onImageDeletion={() => {
            setDeleteCallback(() => () => removeImage(index));
            setDeletionModalVisible(true);
          }}
        />
      );
    }),
  );

  return (
    <>
      <div
        className={`group ${disabled && 'cursor-not-allowed'}`}
        data-disabled={disabled}
      >
        <div className="flex w-full gap-2 overflow-auto rounded rounded-b-none border border-neutral-400 bg-neutral-100 p-1">
          {imageSlots.length > 0 ? (
            imageSlots
          ) : (
            <span className="flex h-36 w-full items-center justify-center text-center text-sm text-neutral-700">
              Não há imagens.
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setModalVisible(true)}
          className="w-full rounded rounded-t-none border border-t-0 border-primary-600 bg-primary-500 px-4 py-2 text-white hover:bg-primary-400 disabled:border-neutral-400 disabled:bg-neutral-200 disabled:text-neutral-400"
          disabled={disabled}
        >
          Adicionar imagem
        </button>
      </div>

      <ImageUploadModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        submit={addImage}
      />

      <ConfirmImageDeletionModal
        visible={deletionModalVisible}
        confirmCallback={deleteCallback}
        close={() => setDeletionModalVisible(false)}
      />
    </>
  );
}
