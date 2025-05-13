import { useRef, useState } from 'react';
import Modal from './Modal';

export default function ImageUploadModal(props: {
  visible: boolean;
  close: () => void;
  submit: (image: File | null, description: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const selectImage = (files: FileList) => {
    setFile(files?.[0]);
  };

  return (
    <Modal title="Adicionar imagem" visible={props.visible} close={props.close}>
      <div className="flex flex-col">
        <div
          className="flex aspect-video w-full flex-col items-center justify-center rounded border-2 border-dashed border-neutral-300 bg-neutral-100 p-4 text-center hover:bg-white"
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            selectImage(event.dataTransfer?.files);
          }}
        >
          {file ? (
            <>
              <img
                id="imagePreview"
                alt="Imagem Preview"
                src={URL.createObjectURL(file)}
                className="mb-4 aspect-video w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
              />
              <label
                htmlFor="image-input"
                className="cursor-pointer text-[1.1rem] font-medium text-blue-600 hover:underline"
              >
                Alterar imagem
              </label>
            </>
          ) : (
            <>
              <label
                htmlFor="image-input"
                className="cursor-pointer text-[1.1rem] font-medium text-blue-600 hover:underline"
              >
                selecionar imagem
              </label>

              <span className="text-neutral-600">
                Ou arraste uma imagem até aqui{' '}
              </span>
            </>
          )}
        </div>

        <input
          id="image-input"
          type="file"
          name="foto"
          onChange={(event) => {
            let files = event.target.files;
            if (files) {
              selectImage(files);
            }
          }}
          className="hidden"
        />

        <label className="mt-4">Descrição da imagem</label>
        <input
          type="text"
          placeholder="Ex.: Fachada do laboratório de engenharias"
          className="rounded border border-neutral-400 px-4 py-2"
          ref={descriptionInputRef}
        />
      </div>

      <hr />

      <div className="mt-4">
        <button
          className="w-full rounded border border-green-600 bg-green-500 px-4 py-2 font-semibold text-white hover:border-green-700 hover:bg-green-600"
          type="button"
          onClick={() => {
            const description = descriptionInputRef.current?.value || '';
            props.submit(file, description);

            setFile(null);

            if (descriptionInputRef.current) {
              descriptionInputRef.current.value = '';
            }

            props.close();
          }}
        >
          Adicionar
        </button>
      </div>
    </Modal>
  );
}
