import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="imgContainer">
        <Image src={product.imageUrl} alt={product.name} width={300} height={200} />
      </div>
      <div className="cardBody">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price">
          <strong>IDR {product.price}</strong>
        </div>
        <Link href={`/menu/${product.id}`} passHref>
          <a className="button">View More</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
