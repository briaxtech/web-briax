"use client"

// Ejemplo mínimo de integración con Daily.co en React
// Archivo: /src/components/VoiceChatDaily.jsx

import { useEffect, useRef, useState } from "react"
import DailyIframe from "@daily-co/daily-js"

export default function VoiceChatDaily() {
  const callFrameRef = useRef(null)
  const containerRef = useRef(null)
  const [inCall, setInCall] = useState(false)

  useEffect(() => {
    return () => {
      // limpiar cuando el componente se desmonte
      if (callFrameRef.current) {
        callFrameRef.current.leave()
        callFrameRef.current.destroy()
      }
    }
  }, [])

  async function startCall() {
    if (!containerRef.current) return

    // ⚠️ IMPORTANTE: crea una cuenta en https://dashboard.daily.co/
    // y generá una "room" (gratuita en el plan free)
    // Ejemplo: https://tudominio.daily.co/demo-room

    const roomUrl = process.env.NEXT_PUBLIC_DAILY_ROOM_URL
    if (!roomUrl) {
      alert("Falta configurar NEXT_PUBLIC_DAILY_ROOM_URL en las variables de entorno")
      return
    }

    callFrameRef.current = DailyIframe.createFrame(containerRef.current, {
      iframeStyle: {
        position: "relative",
        width: "100%",
        height: "400px",
        border: "0",
        borderRadius: "12px",
      },
    })

    callFrameRef.current.join({ url: roomUrl })
    setInCall(true)
  }

  function leaveCall() {
    callFrameRef.current?.leave()
    setInCall(false)
  }

  return (
    <div className="voice-chat-card">
      <div ref={containerRef}></div>

      <div style={{ marginTop: 8 }}>
        {!inCall ? (
          <button onClick={startCall}>Entrar a la demo de voz</button>
        ) : (
          <button onClick={leaveCall}>Salir</button>
        )}
      </div>

      <style jsx>{`
        .voice-chat-card {
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          background: white;
        }
        button {
          margin-right: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          background: #111827;
          color: white;
          cursor: pointer;
        }
        button:hover { background: #1f2937; }
      `}</style>
    </div>
  )
}

/* -------------------------------------------------------------------
README: Integración con Daily (gratis para demo)

1. Crear cuenta en https://dashboard.daily.co/ (free plan).
2. Crear una "room" desde el dashboard. Ej: https://tudominio.daily.co/demo-room
3. En Vercel, agregar en Settings > Environment Variables:
   - NEXT_PUBLIC_DAILY_ROOM_URL=https://tudominio.daily.co/demo-room
4. Instalar SDK: `npm install @daily-co/daily-js`
5. Importar el componente en tu página React/Next.js:

   import VoiceChatDaily from '@/components/VoiceChatDaily';

   export default function Page() {
     return (
       <main>
         <h1>Demo chat de voz</h1>
         <VoiceChatDaily />
       </main>
     );
   }

✔️ Con esto ya tenés un chat/call de voz en tu web, usando minutos gratuitos de Daily.
*/
