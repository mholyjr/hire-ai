import Footer from "@/features/Welcome/Footer";
import { Navigation } from "@/features/Welcome/Navigation";
import { Head } from "@inertiajs/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  metadata: {
    title: string;
    description: string;
    image: string;
  };
};

const PublicLayout = ({ children, metadata }: Props) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Head>

      <Navigation />
      <main className="flex flex-col overflow-hidden">{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
