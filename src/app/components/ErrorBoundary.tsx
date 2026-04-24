import { useRouteError } from "react-router";
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export function GlobalErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    // If it's a dynamic import error (chunk load error), automatically refresh once
    const isChunkLoadError = 
      error instanceof Error && 
      (error.message.includes('Failed to fetch dynamically imported module') || 
       error.message.includes('Importing a module script failed'));

    if (isChunkLoadError) {
      // Check if we've already tried to reload to avoid infinite loop
      if (!sessionStorage.getItem('chunk_load_retried')) {
        sessionStorage.setItem('chunk_load_retried', 'true');
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-['Rajdhani']">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-['Orbitron'] tracking-wider text-white mb-4">
        APPLICATION ERROR
      </h1>
      <p className="text-[#EAFBFF]/60 text-lg md:text-xl max-w-2xl mb-8">
        We encountered an unexpected error while loading this page. This usually happens when the application has been updated.
      </p>
      
      <div className="bg-black/50 border border-white/5 p-4 rounded-lg max-w-2xl w-full mb-10 overflow-auto text-left">
        <code className="text-red-400 text-sm font-mono">
          {error instanceof Error ? error.message : "Unknown Error"}
        </code>
      </div>

      <button
        onClick={() => {
          sessionStorage.removeItem('chunk_load_retried');
          window.location.reload();
        }}
        className="flex items-center gap-3 px-8 py-4 bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] font-['Orbitron'] tracking-widest uppercase text-sm"
      >
        <RefreshCcw size={18} />
        Reload Application
      </button>
    </div>
  );
}
