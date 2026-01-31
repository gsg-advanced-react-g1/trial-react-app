import React, { useState, useEffect } from 'react'
import { Input, Select } from '@mantine/core';
import { IconCategory, IconSearch } from '@tabler/icons-react';
import type { ProductsFilters } from '../../entities/Product';
import { useGetCategories } from '../../hooks/useGetCategories';

type SearchBarProps = {
  setFilters: React.Dispatch<React.SetStateAction<ProductsFilters>>;
  filters: ProductsFilters;
};

const DEBOUNCE_DELAY = 400;

const SearchBar = ({ setFilters, filters }: SearchBarProps) => {
  // Initialize local search value from filters, but it becomes the source of truth
  const [localSearchValue, setLocalSearchValue] = useState(() => filters?.search ?? "");

  const { data: categories, isLoading, isError
  } = useGetCategories();

  // Debounce the search value and update filters
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch = localSearchValue.trim();
      
      setFilters((prev) => {
        // If search text exists, reset category to "All Categories"
        if (trimmedSearch.length > 0) {
          return {
            ...prev,
            search: trimmedSearch,
            category: "All Categories",
          };
        }
        // If search is empty, just update search (keep category as is)
        return {
          ...prev,
          search: "",
        };
      });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [localSearchValue, setFilters]);

  const handleCategoryChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      category: value ?? "All Categories",
    }));
  };
  
  const handleSearchChange = (value: string) => {
    // Update local state immediately for responsive UI
    setLocalSearchValue(value);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
      <Input
        placeholder="Search products..."
        leftSection={<IconSearch size={18} stroke={2} />}
        size="md"
        className="flex-1 sm:flex-[0.65]"
        value={localSearchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className="flex gap-3 justify-end">
        <Select
          placeholder="Category"
          leftSection={<IconCategory size={18} stroke={2} />}
          size="md"
          data={[
            "All Categories",
            ...(categories?.map((category) => category.slug) || []),
          ]}
          defaultValue="All Categories"
          value={filters?.category}
          onChange={(selectedValue) =>
            handleCategoryChange(selectedValue as string)
          }
          disabled={isLoading || isError}
          className="min-w-50"
          comboboxProps={
            { "data-lenis-prevent": true } as React.ComponentProps<"div">
          }
          scrollAreaProps={
            { "data-lenis-prevent": true } as React.ComponentProps<"div">
          }
        />
      </div>
    </div>
  );
};

export default SearchBar