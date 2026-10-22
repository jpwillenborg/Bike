import React from 'react';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';

export default function RootLayout({ children }) {
  return (
    <div className="w-full relative min-h-screen flex flex-col justify-start bg-[#090d16] overflow-x-hidden box-border">
      <div className="app-shell flex flex-col w-full max-w-full overflow-x-hidden box-border flex-grow">
        <SiteNavbar />
        
        <main id="main-content" className="flex-grow w-full relative z-10 pt-[125px] md:pt-[140px] lg:pt-[160px] pb-4 px-6 sm:px-8 md:px-[40px] lg:px-6 box-border">
          {children}
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
