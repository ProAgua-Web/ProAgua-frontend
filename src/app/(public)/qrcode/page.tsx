import { exportQRCode } from "@/utils/qr_code";

export default function QRCodePage() {
    return (
        <div>
        <h1>QR Code Page</h1>
        <button onClick={exportQRCode}>Exportar URL</button>
        </div>
    );
    }