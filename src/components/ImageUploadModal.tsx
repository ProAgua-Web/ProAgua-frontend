import { useState } from "react";
import Modal from "./Modal";

export default function ImageUploadModal(props: {
    visible: boolean, close: () => void,
    submit: (image: File | null, description: string) => void
}) {
    const [file, setFile] = useState<File | null>(null);
    const descriptionInputRef = useRef<HTMLInputElement|null>(null);
    const selectImage = (files: FileList) => {
        setFile(files?.[0]);
    };  

    return (
        <Modal
            title="Adicionar imagem"
            visible={props.visible}
            close={props.close}
        >
            <div className="flex flex-col">
                <div
                    className="border-dashed border-2 flex-col w-full aspect-video flex justify-center items-center text-center rounded bg-neutral-100 border-neutral-300 p-4 hover:bg-white"
                    onDragOver={(event) => {
                        event.preventDefault();
                    }}
                    onDrop={(event) => {
                        event.preventDefault();
                        console.log(event.dataTransfer?.files);
                        selectImage(event.dataTransfer?.files);
                    }} 
                >

                {file 
                ?
                    <>
                        <img
                            id="imagePreview"
                            alt="Imagem Preview"
                            src={URL.createObjectURL(file)}
                            className="mb-4 aspect-video w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
                        />
                        <label
                            htmlFor="image-input"
                            className="font-medium text-blue-600 hover:underline cursor-pointer text-[1.1rem]"
                        >
                            Alterar imagem
                        </label>
                    </>
                :   
                    <>
                        <label
                            htmlFor="image-input"
                            className="font-medium text-blue-600 hover:underline cursor-pointer text-[1.1rem]"
                        >
                            selecionar imagem
                        </label>
                        
                        <span className="text-neutral-600">Ou arraste uma imagem até aqui </span>
                    </>
                }
                </div>
                
                <input 
                    id="image-input"
                    type="file"
                    name="foto"
                    onChange={(event) => {
                        let files = event.target.files;
                        if (files) {
                            selectImage(files)
                        }
                    }}
                    className="hidden"
                />
                
                <label className="mt-4">Descrição da imagem</label>
                <input 
                    type="text"
                    placeholder="Ex.: Fachada do laboratório de engenharias"
                    className="px-4 py-2 border border-neutral-400 rounded"
                    ref={descriptionInputRef}
                />
            </div>

            <hr />
                
            <div className="mt-4">
                <button 
                    className="w-full px-4 py-2 rounded border border-green-600 bg-green-500 hover:bg-green-600 hover:border-green-700 text-white font-semibold"
                    onClick={() => {
                        const description = descriptionInputRef.current?.value || "";
                        props.submit(file, description);

                        props.close();
                    }}
                >
                    Adicionar
                </button>
            </div>
        </Modal>
    )
}
