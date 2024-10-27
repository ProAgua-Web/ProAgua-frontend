import { useRef } from 'react';

export default function Modal(props: {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  var backdrop = useRef(null);

  return (
    props.visible && (
      <div
        ref={backdrop}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-full bg-black bg-opacity-20 "
        onMouseDown={(e) => {
          if (e.target == backdrop.current) props.close();
        }}
      >
        <div
          className={
            'absolute left-1/2 top-1/2 flex h-fit min-h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-neutral-400 bg-white p-4 shadow-xl max-sm:h-full max-sm:max-h-full max-sm:w-full ' +
            (props.className || '')
          }
        >
          <button
            type="button"
            className="p-auto absolute right-4 top-6 h-7 w-7 rounded-[50%] border border-neutral-400 text-xs font-semibold text-neutral-400 hover:bg-neutral-200"
            onClick={props.close}
          >
            X
          </button>

          <h2 className="mb-4 mt-2 w-full text-center text-xl font-semibold">
            {props.title}
          </h2>
          <hr />
          <div className="h-full py-4">{props.children}</div>
        </div>
      </div>
    )
  );
}
