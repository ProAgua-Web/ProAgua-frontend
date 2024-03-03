'use client'

import ProAguaLogo from "/public/ProAguaLogo.svg"
import Image from "next/image"

/*
header {
    position: fixed;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
    
    align-items: center;
    height: clamp(50px, 8vh, 100px);
    background-color: var(--header-bg);
    color: var(--primary-white);
    font-size: 1.5rem;
    
    display: grid;
    grid-area: header;
    grid-template-columns: 64px 1fr;
    
    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.25);
}

.navbar-header {
    align-items: center;
    height: clamp(50px, 8vh, 100px);
    background-color: hsl(var(--clr-primary-900));
    color: var(--primary-white);
    font-size: 1.5rem;
}

a {
    justify-content: center;
    align-items: center;
}


.proagua-logo {
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
    expand: React.MouseEventHandler<HTMLButtonElement>
    collapsed: Boolean
}) {
    return (
        <div 
            id="header-bar"
            className="fixed flex z-10 w-full items-center h-[clamp(50px, 8vh, 100px)] bg-primary-500 text-white-100"
        >
            <button 
                id="menu-button"
                onClick={ props.expand }
                className="h-20 w-20 bg-primary-500 hover:bg-primary-600"
            >l
                <i className="bi bi-list header-icon"></i>
            </button>
            
            <div
                id="header-content"
                className="w-full flex justify-center"
            >
                <div id="proagua-logo" className="w-fit flex items-center gap-4">
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
        </div>
    )
}