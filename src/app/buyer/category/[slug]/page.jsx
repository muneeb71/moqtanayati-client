"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuCard from "@/components/cards/MenuCard";
import { getProductsClient } from "@/lib/api/product/getAllProductsClient";
import { dummyItems } from "@/lib/dummy-items";

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { slug } = params;

        if (!slug) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Check if we have category products in sessionStorage first
        const categoryProducts = sessionStorage.getItem("categoryProducts");
        const storedCategoryName = sessionStorage.getItem("categoryName");

        if (
          categoryProducts &&
          storedCategoryName === decodeURIComponent(slug)
        ) {
          const parsedProducts = JSON.parse(categoryProducts);
          setProducts(parsedProducts);
          console.log(
            "🔍 [CategoryPage] Using category products from sessionStorage:",
            parsedProducts.length,
          );
          setLoading(false);
          return;
        }

        // Fetch all products and filter by category
        console.log("🔍 [CategoryPage] Fetching all products...");
        const response = await getProductsClient();
        if (response.success && response.data) {
          const categoryName = decodeURIComponent(slug);
          const filteredProducts = response.data.filter((product) => {
            const productCategories =
              product.categories || product.productCategories || [];
            return productCategories.some(
              (cat) =>
                cat.toLowerCase().includes(categoryName.toLowerCase()) ||
                categoryName.toLowerCase().includes(cat.toLowerCase()),
            );
          });
          setProducts(filteredProducts);
          console.log(
            "🔍 [CategoryPage] Filtered products:",
            filteredProducts.length,
          );
        } else {
          setProducts(dummyItems);
        }
      } catch (err) {
        console.log("Error fetching products:", err);
        setError(err.message);
        setProducts(dummyItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-moonstone border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-3">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 py-20">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center font-medium text-battleShipGray">
            Products in Category
          </p>
          <span className="text-center text-[32px] font-medium leading-[48px] text-eerieBlack">
            {decodeURIComponent(params.slug)}
          </span>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[21px] font-medium leading-[31px]">
                  {products.length}{" "}
                  <span className="font-normal text-battleShipGray">
                    Results
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {products.length > 0 ? (
              products.map((item, index) => (
                <MenuCard
                  id={item?.id}
                  key={index}
                  title={item?.name}
                  user={item?.seller?.name || "Seller"}
                  price={item?.price || item?.buyItNow}
                  image={item?.images?.[0]}
                  isFavourite={false}
                  productId={item?.id}
                  showBidButton={true}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
