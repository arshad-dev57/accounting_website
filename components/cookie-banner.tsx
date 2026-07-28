"use client";

import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true
    }));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", "customized");
    localStorage.setItem("cookie-preferences", JSON.stringify({
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled
    }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      backgroundColor: "#1a1a2e",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      padding: "20px 24px",
      zIndex: 9999,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.2)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {/* Message */}
        <p style={{
          color: "#e0e0e0",
          fontSize: "14px",
          lineHeight: "1.6",
          margin: 0,
          textAlign: "center"
        }}>
          We use cookies to personalize content, to provide social media features, and to analyze our traffic.
          We also share information about your use of our site with our social media and analytics partners.
        </p>

        {/* Preferences Panel */}
        {showDetails && (
          <div style={{
            backgroundColor: "#0f0f1a",
            borderRadius: "12px",
            padding: "16px 20px",
            marginTop: "8px",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            <h4 style={{ color: "#fff", fontSize: "14px", marginBottom: "12px", fontWeight: 600 }}>
              Manage Cookie Preferences
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Essential - Always Active */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Essential Cookies</span>
                  <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>Required for the website to function</p>
                </div>
                <span style={{ color: "#00ffbe", fontSize: "12px", backgroundColor: "rgba(0,255,190,0.1)", padding: "4px 12px", borderRadius: "20px" }}>Always Active</span>
              </div>

              {/* Analytics Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Analytics Cookies</span>
                  <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>Help us improve our website</p>
                </div>
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  style={{
                    width: "44px",
                    height: "24px",
                    backgroundColor: analyticsEnabled ? "#00ffbe" : "#444",
                    borderRadius: "24px",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s",
                    padding: 0
                  }}
                >
                  <span style={{
                    position: "absolute",
                    top: "2px",
                    left: analyticsEnabled ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    transition: "left 0.2s"
                  }} />
                </button>
              </div>

              {/* Marketing Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Marketing Cookies</span>
                  <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0" }}>Used for personalized advertising</p>
                </div>
                <button
                  onClick={() => setMarketingEnabled(!marketingEnabled)}
                  style={{
                    width: "44px",
                    height: "24px",
                    backgroundColor: marketingEnabled ? "#00ffbe" : "#444",
                    borderRadius: "24px",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s",
                    padding: 0
                  }}
                >
                  <span style={{
                    position: "absolute",
                    top: "2px",
                    left: marketingEnabled ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    transition: "left 0.2s"
                  }} />
                </button>
              </div>
            </div>

            <button
              onClick={handleSavePreferences}
              style={{
                marginTop: "16px",
                padding: "8px 20px",
                backgroundColor: "#00ffbe",
                border: "none",
                borderRadius: "6px",
                color: "#000",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%"
              }}
            >
              Save Preferences
            </button>
          </div>
        )}

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <button
            onClick={handleAccept}
            style={{
              padding: "10px 28px",
              backgroundColor: "#00ffbe",
              border: "none",
              borderRadius: "6px",
              color: "#000",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Accept
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              padding: "10px 28px",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              color: "#e0e0e0",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {showDetails ? "Hide Preferences" : "Manage Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CookieBanner };