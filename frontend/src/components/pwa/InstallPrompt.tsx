import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInstalled, promptInstall } from "@/serviceWorkerRegistration";

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (isInstalled()) {
      return;
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Listen for install prompt
    const handleBeforeInstall = () => {
      setCanInstall(true);
      // Show prompt after user has been on site for 30 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Check if already has deferred prompt
    if ((window as any).deferredPrompt) {
      setCanInstall(true);
      setTimeout(() => setShowPrompt(true), 30000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-dismissed", Date.now().toString());
  };

  if (!showPrompt || !canInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">
              Install EvidenceMed App
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add to your home screen for quick access to research, offline reading, and notifications.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={handleDismiss} className="flex-1">
            Not now
          </Button>
          <Button size="sm" onClick={handleInstall} className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Install
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
