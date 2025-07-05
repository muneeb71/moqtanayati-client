"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ResultItems from "@/components/sections/landing/categories/ResultItems";
import { getProductByCategory } from "@/lib/api/product/getProductByCategory";
import { dummyItems } from "@/lib/dummy-items";

const CategoryPage = () => {
  const params = useParams();
  const [items, setItems] = useState(dummyItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { slug } = params;
        
        if (!slug) {
          setItems(dummyItems);
          setLoading(false);
          return;
        }
        
        const res = await getProductByCategory(slug);
  
        if (res?.data) {
          setItems(res.data.data);
        } else {
          setItems(dummyItems);
        }
      } catch (err) {
        console.log('Error fetching products:', err);
        setError(err.message);
        setItems(dummyItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.slug]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!loading && (!items || items.length === 0)) return <p>No Items Found!</p>

  return <ResultItems items={items} />;
};

export default CategoryPage;
