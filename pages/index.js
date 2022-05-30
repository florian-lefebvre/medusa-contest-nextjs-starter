import styles from "../styles/home.module.css";
import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { BsBook, BsGithub } from "react-icons/bs";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  const tags = [
    {
      url: "https://medusajs.com/",
      name: "Medusa",
    },
    {
      url: "https://nextjs.org/docs/getting-started",
      name: "Next.js",
    },
    {
      url: "https://stripe.com/docs",
      name: "Stripe",
    },
  ];

  const Hero = () => (
    <div className="bg-gradient-to-tr from-violet-60 to-violet-50">
      <div className="custom-container py-24 px-6">
        <h1 className="text-5xl text-white font-bold mb-6">
          Medusa + Next.js Starter{" "}
          <span role="img" aria-label="Rocket emoji">
            🚀
          </span>
        </h1>
        <p className="max-w-xl text-violet-5 text-lg mb-10">
          Build blazing-fast client applications on top of a modular headless
          commerce engine. Integrate seamlessly with any 3rd party tools for a
          best-in-breed commerce stack.
        </p>
        <div className="flex space-x-2 mb-16">
          {tags.map(({ name, url }) => (
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              key={url}
              className="bg-violet-20 px-4 py-2 rounded-full text-violet-60 font-medium hover:bg-white transition-colors inline-flex items-center space-x-1"
            >
              <span>{name}</span>{" "}
              <FiExternalLink className="text-violet-50" size="0.85rem" />
            </a>
          ))}
        </div>
        <div className="flex space-x-6">
          <a
            href="https://docs.medusajs.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-white px-6 py-3 rounded-lg text-violet-60 font-medium hover:bg-violet-5 transition-colors inline-flex items-center space-x-3 text-lg"
          >
            <BsBook />
            <span>Read the docs</span>
          </a>
          <a
            href="https://github.com/medusajs/medusa"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-violet-50 px-6 py-3 rounded-lg text-white font-medium hover:bg-violet-40 transition-colors inline-flex items-center space-x-3 text-lg"
          >
            <BsGithub />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );

  const Products = () => (
    <div className="custom-container py-24 px-6">
      <h2 className="text-4xl font-bold">Demo products</h2>
      <div className="mt-10 grid grid-cols-4 gap-x-4 gap-y-12">
        {products.map(({ id, thumbnail, title, variants }) => (
          <Link href={`/product/${id}`} key={id}>
            <a className="rounded-2xl transition-all transform hover:scale-95 focus:ring focus:ring-violet-50">
              <img src={thumbnail} alt={title} className="rounded-2xl" />
              <div className="p-4 text-left">
                <div className="text-xl font-medium">{title}</div>
                <div className="text-sm">
                  <span className="font-semibold text-violet-50">
                    {formatPrices(cart, variants[0])}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      <Hero />
      <Products />
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
