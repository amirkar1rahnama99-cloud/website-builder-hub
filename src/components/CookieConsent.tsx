import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("zenvara-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("zenvara-cookie-consent", accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-card border border-border rounded-lg shadow-lg p-4 animate-fade-in">
      <p className="text-sm text-foreground mb-3">
        This site uses cookies for analytics.
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => handleConsent(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold"
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleConsent(false)}
          className="rounded-lg"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
