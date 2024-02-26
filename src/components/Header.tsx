import ProAguaLogo from "/public/ProAguaLogo.svg"
import Image from "next/image"

/*
header {
    position: fixed;
    width: 100%;
    z-index: 1;
    justify-content: space-between;
}

header, .navbar-header {
    align-items: center;
    height: clamp(50px, 8vh, 100px);
    background-color: hsl(var(--clr-primary-900));
    color: var(--primary-white);
    font-size: 1.5rem;
}

header a {
    justify-content: center;
    align-items: center;
}

#header-bar {
    grid-area: header;
    background-color: var(--header-bg);

    display: grid;
    align-items: center;
    grid-template-columns: 64px 1fr;

    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.25);
}

#header-bar .proagua-logo {
    justify-self: center;
    padding-right: 64px;
}

.header-icon {
    font-size: 24px;
    color: white;
    line-height: 20px;
}
*/

export default function(props: {
    collapseFunction: Function
    collapsed: Boolean
}) {
    return (
        <div 
            id="header-bar"
            className="fixed grid shadow items-center bg-primary-500 w-full justify-between p-4"
        >
            <button 
                id="menu-button"
                onClick={ props.collapseFunction() }
            >
                <i className="bi bi-list header-icon"></i>
            </button>
            
            <div id="proagua-logo" className="flex items-center gap-4">
                <Image
                    src={ ProAguaLogo } 
                    className="max-h-10"
                    alt="Logo do projeto"
                />
                <a 
                    href="/"
                    className="text-2xl font-semibold text-white-100"
                >
                    ProÁgua
                </a>
            </div>
        </div>
    )
}