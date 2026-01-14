import React, { useState } from 'react'
import { Input, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
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
        <div className='flex w-full justify-between items-center'>

            <Input
                placeholder="Search"
                rightSection={<IconSearch size={16} />}
                className='flex-[0.6]'
                value={filters?.search}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="flex flex-1 gap-5 justify-end">

                <Select
                    placeholder="Category"
                    data={["All Categories", ...(categories?.map((category) => category.slug) || [])]}
                    defaultValue="All Categories"
                    value={filters?.category}
                    onChange={(selectedValue) => handleCategoryChange(selectedValue as string)}
                    disabled={isLoading || isError}
                />
            </div>
        </div>
    )
}

export default SearchBar