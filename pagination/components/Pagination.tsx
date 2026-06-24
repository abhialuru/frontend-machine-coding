"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface ProductTypes {
  id: number;
  title: string;
  thumbnail: string;
}

const PAGE_SIZE = 10;

function Pagination() {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const [currentPage, setCurrentPage] = useState(0);

  async function handleProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      const data = await response.json();
      setProducts(data.products);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleProducts();
  }, []);

  const totalPages = products.length;

  const noOfPages = Math.ceil(totalPages / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <div className="p-10">
      <div className="flex flex-wrap justify-center items-center gap-5">
        {products &&
          products
            .slice(start, end)
            .map((item, _) => (
              <ProductCard
                key={item.id}
                image={item.thumbnail}
                title={item.title}
              />
            ))}
      </div>
      <div className="flex gap-2 w-fit mx-auto mt-10">
        {[...Array(noOfPages).keys()].map((n) => (
          <span
            onClick={() => setCurrentPage(n)}
            className="border p-1 px-2 cursor-pointer"
            key={n}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
