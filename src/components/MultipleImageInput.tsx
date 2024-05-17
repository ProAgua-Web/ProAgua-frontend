import { useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import { Image } from "@/utils/types";

export default function MultipleImageInput(props: { 
    images: Image[], 
    setImages: (images: Image[]) => void, 
    disabled: boolean
}) {
    const { images } = props;
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);

    return (
        <>
            <ImageUploadModal
                visible={modalVisible}
                close={() => setModalVisible(false)}
                submit={(file: File | null, description: string) => {
                    if (file != null) {
                        props.setImages([...images, {file, description}]);
                    }
                }}
            />

            <div>
                <div className="w-full overflow-auto p-1 rounded border rounded-b-none border-neutral-400 bg-neutral-100 flex gap-2">
                    {images.length > 0 ? 
                        images.map(image => {
                            let image_url;

                            if (image.file  instanceof File) {
                                image_url = URL.createObjectURL(image.file);
                            } else {
                                image_url = process.env.NEXT_PUBLIC_API_URL + image.file;
                            }

                            return (
                                <div className="block w-fit flex-shrink-0 hover:bg-blue-300 p-2 border border-transparent hover:border-blue-300 rounded">
                                    <img
                                        id="imagePreview"
                                        alt="Imagem Preview"
                                        src={image_url}
                                        className="h-36 w-64 block rounded border border-neutral-300 bg-neutral-200 object-cover"
                                    />
                                    <span className="text-sm text-blue-950 text-center pt-2 w-64 overflow-hidden text-nowrap text-ellipsis block">{image.description}</span>
                                </div>
                            )
                        })
                    : 
                    <span className="text-sm text-neutral-700 text-center w-full h-36 flex justify-center items-center">Não há imagens.</span>
                }
                </div>
                <button 
                    type="button"
                    onClick={() => setModalVisible(true)}
                    className="w-full bg-neutral-200 rounded border-t-0 border rounded-t-none border-neutral-400 hover:bg-neutral-300 px-4 py-2"
                >
                    Adicionar imagem
                </button>
            </div>
        </>

    )
}
