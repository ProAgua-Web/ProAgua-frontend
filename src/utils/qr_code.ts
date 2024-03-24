'use client'

import QRCode from 'qrcode';

const exportQRCode = async () => {
    const url = window.location.href;

    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, url);

    const base64Image = canvas.toDataURL('image/png');
    const blob = await (await fetch(base64Image)).blob();
    const blobUrl = URL.createObjectURL(blob);


    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'qrcode.png';

    const img = document.createElement('img');
    img.src = blobUrl;
    a.appendChild(img);
    document.body.appendChild(a);
};

export { exportQRCode };