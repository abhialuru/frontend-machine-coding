import Image from "next/image";

interface ProductCardTypes {
  image: string;
  title: string;
}

function ProductCard({ image, title }: ProductCardTypes) {
  return (
    <div className="flex flex-col size-[200px] gap-2 border p-3">
      <div className="size-[150px] mx-auto relative">
        <Image className="absolute inset-0" alt="products" src={image} fill />
      </div>
      <p className="text-center">{title}</p>
    </div>
  );
}

export default ProductCard;
