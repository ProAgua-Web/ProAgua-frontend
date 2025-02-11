export interface InputMask {
  mask: (texto: string | undefined) => string;
  unmask: (texto: string | undefined) => string;
}

export const cpfMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 11) ?? '';
  },
};

export const cnpjMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 14) ?? '';
  },
};

export const telefoneMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 11) ?? '';
  },
};

export const cepMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 8) ?? '';
  },
};

export const valorMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/\D/g, '')
        .replace(/^0+/, '')
        .padStart(3, '0')
        .replace(/(\d*)$/, 'R$ $1')
        .replace(/(\d{1,})(\d{2})$/, '$1,$2')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').replace(/^0+/, '') ?? '';
  },
};

export const dataMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/^(\d)\//g, '0$1/')
        .replace(/\/(\d\D)/g, '/0$1')
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 8) ?? '';
  },
};

export const horaMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/^(\d):/, '0$1:')
        .replace(/:(\d)\D/, ':0$1')
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1:$2')
        .replace(/(\d{2})\d+?$/, '$1') ?? ''
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, '').slice(0, 4) ?? '';
  },
};

export const dataHoraMask: InputMask = {
  mask(texto) {
    if (!texto) {
      return '';
    }

    let [data, hora] = texto.split(' ') as [string, string | undefined];
    if (data.length > 8) {
      hora = data.slice(8) + (hora ? hora : '');
      data = data.slice(0, 8);
    }

    let novoTexto = dataMask.mask(data);

    if (hora !== undefined) {
      novoTexto += ' ';
    }

    if (hora) {
      novoTexto += horaMask.mask(hora);
    }

    return novoTexto;
  },
  unmask(texto) {
    if (!texto) {
      return '';
    }

    let [data, hora] = texto.split(' ') as [string, string | undefined];
    if (data.length > 10) {
      hora = data.slice(10) + (hora ? hora : '');
      data = data.slice(0, 8);
    }

    if (data.length === 10 && hora === '') {
      return dataMask.unmask(data) + ' ';
    }

    if (!hora) {
      return dataMask.unmask(data);
    }

    return dataMask.unmask(data) + ' ' + horaMask.unmask(hora);
  },
};
