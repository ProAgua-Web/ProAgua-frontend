"use client"
import { useQRCode } from 'next-qrcode';

export default function QRCode(props: { data: string, width?: number }) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={props.data}
      options={{
        errorCorrectionLevel: 'M',
        margin: 1,
        scale: 4,
        width: props.width ? props.width : 200,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }}
    />
  );
}
