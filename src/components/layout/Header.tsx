import ProAguaLogo from "/public/ProAguaLogo.svg";
import Image from "next/image";

export default function (props: {
  expand?: React.MouseEventHandler<HTMLButtonElement>;
  collapsed?: Boolean;
}) {
  return (
    <header>
      <div
        id="header-bar"
        className="h-[clamp(50px, 8vh, 100px)] fixed z-20 flex w-full items-center bg-primary-500 text-white-100"
      >
        <button
          id="menu-button"
          onClick={props.expand}
          className="h-20 w-20 bg-primary-500 hover:bg-primary-600"
        >
          -
        </button>
        <i className="bi bi-list header-icon"></i>

        <div id="header-content" className="flex w-full justify-center">
          <div id="proagua-logo" className="w-fit items-center">
            <a href="/" className="text-2xl font-semibold text-white-100 select-none flex gap-2 items-center">
              <Image
                src={ProAguaLogo}
                className="max-h-10"
                alt="Logo do projeto"
              />
              ProÁgua
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
