import { useRef } from "react";

export default function Modal(props: { 
    visible: boolean,
    close: () => void,
    children: React.ReactNode,
    title: string
    className?: string
}) {
    var backdrop = useRef(null);

    return props.visible && (
        <div 
            ref={backdrop} 
            className="bg-black bg-opacity-20 w-full h-[calc(100vh-4rem)] fixed top-16 left-0 "
            onMouseDown={(e) => {
                if (e.target == backdrop.current)
                    props.close();
            }}
        >
            <div className={"flex h-fit max-sm:h-full flex-col max-sm:w-full max-sm:max-h-full w-[600px] min-h-[400px] absolute bg-white shadow-xl border border-neutral-400 p-4 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " + (props.className || '')}>

                <button
                    type="button"
                    className="absolute right-4 top-6 rounded-[50%] border border-neutral-400 text-neutral-400 w-7 font-semibold h-7 p-auto text-xs hover:bg-neutral-200"
                    onClick={props.close}
                >
                    X
                </button>
                
                <h2 className="mt-2 mb-4 text-xl font-semibold w-full text-center">{ props.title }</h2>
                <hr />
                <div className="py-4 h-full">
                    { props.children }
                </div>
            </div>
        </div>
    )
}
