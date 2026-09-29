import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import { notFound } from "next/navigation";
import ProductConfiguratorClient from "@/components/product/ProductConfiguratorClient";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!product) {
    notFound();
  }

  const specs = JSON.parse(product.specs);
  const images = JSON.parse(product.images);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ProductConfiguratorClient product={product} specs={specs} images={images} />
    </main>
  );
}
