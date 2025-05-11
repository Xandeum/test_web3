// src/websocket.ts
import WebSocket from 'ws';

type ResultValue = {
  fsid?: string;
  status?: string;
  data?: any; 
};

export function subscribeToBigBangResult(
  tx: string,
  wsUrl: string,
  onResult: (value: ResultValue) => void,
  onError?: (err: any) => void,
  onClose?: () => void
): void {
  const ws = new WebSocket(wsUrl);

  ws.addEventListener('open', () => {
    const subscriptionMessage = {
      jsonrpc: "2.0",
      id: 1,
      method: "xandeumResultSubscribe",
      params: [tx, { commitment: "finalized" }],
    };
    ws.send(JSON.stringify(subscriptionMessage));
  });

  ws.addEventListener('message', (event) => {
    const d = JSON.parse(
      String(event.data).replace(/:\s*(\d{16,})/g, ': "$1"')
    );

    const value = d?.params?.result?.value;
    if (value?.fsid || value?.status || value?.data) {
      onResult({
        fsid: value.fsid,
        status: value.status,
        data: value.data,
      });
    }
  });

  ws.addEventListener('error', (error) => {
    if (onError) onError(error);
  });

  ws.addEventListener('close', () => {
    if (onClose) onClose();
  });
}
