import { useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import { ImageIn, ImageOut } from "@/utils/types";
import Modal from "./Modal";

function ConfirmImageDeletionModal(props: {
    visible: boolean,
    confirmCallback: () => void,
    close: () => void
}) {
    return (
        <Modal
            className="min-h-0 w-fit max-sm:h-fit max-sm:w-fit"
            title="Deseja confirmar a exclusão da imagem?"
            close={ props.close }
            visible={ props.visible }
        >
            <div className="flex w-full  gap-2">
                <button
                    className="w-full px-4 py-2 rounded bg-neutral-500 hover:bg-neutral-600 border border-neutral-600 hover:boder-red-700 text-white font-semibold"
                    onClick={ props.close }
                    type="button"
                >
                    Cancelar
                </button>

                <button
                    className="w-full px-4 py-2 rounded bg-red-500 hover:bg-red-600 border border-red-600 hover:boder-red-700 text-white font-semibold"
                    onClick={ () => {
                        props.confirmCallback();
                        props.close();
                    }}
                    type="button"
                >
                    Confirmar
                </button>
            </div>
        </Modal>
    )
}

function ImageSlot(props: {
    imageUrl: string,
    imageDescription: string,
    disabled?: boolean,
    onImageDeletion: () => void
}) {
    return (
        <div
            key={ props.imageUrl }
            className="group/image cursor-pointer relative block w-fit flex-shrink-0 hover:bg-blue-300 p-2 border border-transparent hover:border-blue-300 rounded"
        >
            <button
                className="hidden group-hover/image:block rounded-full p-0 w-6 h-6 text-center align-middle bg-white border border-neutral-600 text-neutral-600 hover:bg-red-500 hover:text-white absolute top-0 right-0 font-semibold disabled:"
                type="button"
                onClick={ props.onImageDeletion }
                disabled={ props.disabled }
            >
                x
            </button> 
            <img
                id="imagePreview"
                alt="Imagem Preview"
                src={ props.imageUrl }
                className="h-36 w-64 block rounded border border-neutral-300 bg-neutral-200 object-cover"
            />
            <span 
                className="text-sm text-blue-950 text-center pt-2 w-64 overflow-hidden text-nowrap text-ellipsis block"
            >
                { props.imageDescription }
            </span>
        </div>
    )
}

type MultipleImageInputProps = {   
    existingImages?: ImageOut[];
    removeExistingImage?: (url: string) => void;
    images: ImageIn[];
    setImages: (image: ImageIn[]) => void;
    disabled?: boolean;
};

export default function MultipleImageInput({
    existingImages=[],
    removeExistingImage = (url: string) => {},
    images,
    setImages,
    disabled=false
}: MultipleImageInputProps) {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ deletionModalVisible, setDeletionModalVisible] = useState<boolean>(false);
    const [ deleteCallback, setDeleteCallback] = useState<()=>void>(() => () => {});

    const addImage = (file: File | null, description: string) => {
        if (file !== null) {
            const newImage = {
                src: "",
                file: file,
                description: description,
            };
            setImages([...images, newImage]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.splice(index, 1));
    };

    let imageSlots = existingImages.map(image => {
        const imageUrl = process.env.NEXT_PUBLIC_API_URL + image.src;

        return <ImageSlot
            key={ imageUrl }
            imageUrl={ imageUrl }
            imageDescription={ image.description }
            onImageDeletion={() => {
                setDeleteCallback(() => () => removeExistingImage(imageUrl));
                setDeletionModalVisible(true);
            }}
        /> 
    })

    imageSlots = imageSlots.concat(images.map((image, index) => {
        const imageUrl = URL.createObjectURL(image.file);

        return <ImageSlot 
            key={ imageUrl }
            imageUrl={ imageUrl }
            imageDescription={ image.description }
            onImageDeletion={() => {
                setDeleteCallback(() => () => removeImage(index));
                setDeletionModalVisible(true);
            }}
        /> 
    }));

    return (
        <>
        <div className={ `group ${ disabled && "cursor-not-allowed" }` } data-disabled={ disabled }>
                <div className="w-full overflow-auto p-1 rounded border rounded-b-none border-neutral-400 bg-neutral-100 flex gap-2">
                    {imageSlots.length > 0 
                        ? imageSlots
                        : <span className="text-sm text-neutral-700 text-center w-full h-36 flex justify-center items-center">Não há imagens.</span>
                    }
                </div>
                <button 
                    type="button"
                    onClick={() => setModalVisible(true)}
                    className="w-full bg-primary-500 text-white rounded border-t-0 border rounded-t-none border-primary-600 hover:bg-primary-400 px-4 py-2 disabled:text-neutral-400 disabled:bg-neutral-200 disabled:border-neutral-400"
                    disabled={ disabled }
                >
                    Adicionar imagem
                </button>
            </div>

            <ImageUploadModal
                visible={modalVisible}
                close={() => setModalVisible(false)}
                submit={ addImage }
            />

            <ConfirmImageDeletionModal
                visible={ deletionModalVisible }
                confirmCallback={ deleteCallback }
                close={ () => setDeletionModalVisible(false) }
            />
        </>

    )
}
