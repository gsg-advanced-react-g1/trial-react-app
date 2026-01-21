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
        styles={{
          input: {
            borderColor: "#1e293b",
            borderWidth: "2px",
            fontSize: "15px",
            height: "48px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            "&::placeholder": {
              color: "#94a3b8",
            },
            "&:focus": {
              borderColor: "#a855f7",
              boxShadow:
                "0 0 0 3px rgba(168, 85, 247, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)",
            },
          },
          section: {
            color: "#64748b",
          },
        }}
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
          styles={{
            input: {
              borderColor: "#1e293b",
              borderWidth: "2px",
              fontSize: "15px",
              height: "48px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              "&:focus": {
                borderColor: "#a855f7",
                boxShadow:
                  "0 0 0 3px rgba(168, 85, 247, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)",
              },
            },
            section: {
              color: "#64748b",
            },
            dropdown: {
              borderColor: "#1e293b",
              borderWidth: "2px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar