import React from 'react'
import { Input, Select } from '@mantine/core';
import { IconCategory, IconSearch } from '@tabler/icons-react';
import type { ProductsFilters } from '../../entities/Product';
import { useGetCategories } from '../../hooks/useGetCategories';

type SearchBarProps = {
  setFilters: React.Dispatch<React.SetStateAction<ProductsFilters>>;
  filters: ProductsFilters;
};


const SearchBar = ({ setFilters, filters }: SearchBarProps) => {

  const { data: categories, isLoading, isError
  } = useGetCategories();

  const handleCategoryChange = (value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      category: value ?? "All Categories",
    }));
  };
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-4">
      <Input
        placeholder="Search products..."
        leftSection={<IconSearch size={18} stroke={2} />}
        size="md"
        className="flex-1 sm:flex-[0.65]"
        value={filters?.search}
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