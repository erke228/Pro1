import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const usersCount = await prisma.user.count();

  return (
    <div>
      <h1 className="text-3xl font-sans font-medium mb-8">SYSTEM OVERVIEW</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-mono text-sm text-foreground-secondary mb-2">TOTAL PRODUCTS</h3>
          <p className="text-4xl font-sans font-bold text-accent-cyan">{productsCount}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-mono text-sm text-foreground-secondary mb-2">TOTAL ORDERS</h3>
          <p className="text-4xl font-sans font-bold text-accent-purple">{ordersCount}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-mono text-sm text-foreground-secondary mb-2">REGISTERED USERS</h3>
          <p className="text-4xl font-sans font-bold text-accent-pink">{usersCount}</p>
        </div>
      </div>
    </div>
  );
}
