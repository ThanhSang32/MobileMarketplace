
import { client } from './sanity';

export async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    description,
    "image": image.asset->url,
    category->{
      name
    }
  }`);
}

export async function getProduct(id: string) {
  return client.fetch(`*[_type == "product" && _id == $id][0]`, { id });
}
