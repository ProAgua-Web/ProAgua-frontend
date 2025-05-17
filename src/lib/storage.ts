import { type Token } from '@/core/common/autenticacao/autenticacao.service';
// import { csrfToken } from './autenticacao';

// export function salvarUsuarioNoLocalStorage(usuario: Usuario) {
//   if ('window' in globalThis) {
//     localStorage.setItem(
//       'clinicaoitavarosado:usuario',
//       JSON.stringify(usuario),
//     );
//   }
// }

// export function salvarCSRFTokenNoLocalStorage(token: string) {
//   if ('window' in globalThis) {
//     localStorage.setItem('proagua:csrftoken', JSON.stringify(token));
//   }
// }

export function salvarTokenNoLocalStorage(token: Token) {
  if ('window' in globalThis) {
    localStorage.setItem('proagua:token', JSON.stringify(token));
  }
}

// export function usuarioSalvoNoLocalStorage(): Usuario | null {
//   if ('window' in globalThis) {
//     try {
//       const usuario = localStorage.getItem('clinicaoitavarosado:usuario');
//       return usuario ? (JSON.parse(usuario) as Usuario) : null;
//     } catch {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }

export function csrfTokenSalvoNoLocalStorage(): string | null {
  if ('window' in globalThis) {
    try {
      const csrfToken = localStorage.getItem('proagua:csrftoken');
      return csrfToken ? (JSON.parse(csrfToken) as string) : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

export function csrfTokenSalvoNosCookies(): string | null {
  if ('window' in globalThis) {
    try {
      const cookies = document.cookie.split(';');
      const csrfToken = cookies.find((cookie) =>
        cookie.trim().startsWith('csrftoken='),
      );
      return csrfToken?.split('=')[1] || null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

export function tokenSalvoNoLocalStorage(): Token | null {
  if ('window' in globalThis) {
    try {
      const token = localStorage.getItem('proagua:token');
      return token ? (JSON.parse(token) as Token) : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

// export function removerUsuarioDoLocalStorage() {
//   if ('window' in globalThis) {
//     localStorage.removeItem('clinicaoitavarosado:usuario');
//   }
// }

export function removerTokenDoLocalStorage() {
  if ('window' in globalThis) {
    localStorage.removeItem('proagua:token');
  }
}
