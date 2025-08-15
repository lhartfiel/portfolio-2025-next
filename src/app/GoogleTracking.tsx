"use client";
import Script from "next/script";

const GoogleTrackingScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CEXHSSMDN7"
        strategy="beforeInteractive"
      />
      {/* Initialize GA4 */}
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CEXHSSMDN7');
        `}
      </Script>
    </>
  );
};

export { GoogleTrackingScript };
