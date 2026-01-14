import React, { useState } from 'react'
import { Input, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import type { ProductsFilters } from '../../Types/types';
import { useGetCategories } from '../../hooks/useGetCategories';

type SearchBarProps = {
    setFilters: React.Dispatch<React.SetStateAction<ProductsFilters>>;
    category: string;
};


const SearchBar = ({ setFilters, category }: SearchBarProps) => {

    const { data: categories, isLoading, isError
    } = useGetCategories();

    const handleCategoryChange = (value: string) => {
        setFilters({ category: value });

    }

    return (
        <div className='flex w-full justify-between items-center'>

            <Input
                placeholder="Search"
                rightSection={<IconSearch size={16} />}
                className='flex-[0.6]'
            />
            <div className="flex flex-1 gap-5 justify-end">

                <Select
                    placeholder="Category"
                    data={["All Categories", ...(categories?.map((category) => category.slug) || [])]}
                    defaultValue="All Categories"
                    value={category}
                    onChange={(selectedValue) => handleCategoryChange(selectedValue as string)}
                    disabled={isLoading || isError}
                />
            </div>
        </div>
    )
}

export default SearchBar