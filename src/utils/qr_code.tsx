'use client';
import { useQRCode } from 'next-qrcode';

export default function QRCode(props: { data: string; width?: number }) {
  const { Canvas } = useQRCode();
  const size = props.width ?? 200;
  const logoSize = size * 0.33;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <Canvas
        text={props.data}
        options={{
          errorCorrectionLevel: 'H', // aumenta tolerância para logo central
          margin: 2,
          scale: 4,
          width: size,
          color: {
            dark: '#027BD0', // azul da logo
            light: '#FFFFFF', // fundo branco
          },
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: logoSize,
          height: logoSize,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          borderRadius: '100%',
          boxShadow: '0 0 4px #027BD0, 0 0 0 6px #fff', // leve destaque
          padding: 4,
        }}
      >
        <img
          src="/favicon.svg"
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
