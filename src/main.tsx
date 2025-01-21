import { CheckCheck, XIcon } from 'lucide-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      containerClassName="pointer-events-none touch-none"
      position="top-center"
      toastOptions={{
        style: {
          background: "#1C1C1C",
          color: "#fff",
          padding: "15px",
          borderRadius: "32px",
          gap: "6px",
          maxWidth: "max-content",
          width: "95%",
          pointerEvents: "none",
          touchAction: "none",
        },
        duration: 4000,
        success: {
          icon: <CheckCheck size={24} color={"#38df0a"} />,
        },
        error: {
          icon: <XIcon size={24} color="#fd2b59" />,
        },
      }}
    />

    <App />
  </StrictMode >,
)
