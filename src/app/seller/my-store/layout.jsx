import { InventoryStoreProvider } from "@/providers/inventory-store-provider";


const StoreLayout = ({ children }) => {
  return <InventoryStoreProvider>{children}</InventoryStoreProvider>;
};

export default StoreLayout;
