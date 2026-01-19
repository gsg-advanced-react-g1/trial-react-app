import { useState, useCallback } from "react";
import type { Product } from "../entities/Product";

export const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing product to allow exit animation
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  return {
    selectedProduct,
    isOpen,
    openModal,
    closeModal,
  };
};