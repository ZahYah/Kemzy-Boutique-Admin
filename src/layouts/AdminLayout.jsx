import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { AdminProvider } from '../context/AdminContext';
import { ProductsProvider } from '../context/ProductsContext';
import { OrdersProvider } from '../context/OrdersContext';
import { PaymentsProvider } from '../context/PaymentsContext';
import { CustomersProvider } from '../context/CustomersContext';
import { CategoriesProvider } from '../context/CategoriesContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AdminLayoutInner() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-bone-200">
      <Sidebar />
      <div
        className={`transition-[margin] duration-200 ease-out ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Topbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminProvider>
      <ProductsProvider>
        <OrdersProvider>
          <PaymentsProvider>
            <CustomersProvider>
              <CategoriesProvider>
                <SidebarProvider>
                  <AdminLayoutInner />
                </SidebarProvider>
              </CategoriesProvider>
            </CustomersProvider>
          </PaymentsProvider>
        </OrdersProvider>
      </ProductsProvider>
    </AdminProvider>
  );
}
