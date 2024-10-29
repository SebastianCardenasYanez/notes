import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    return (
        <SearchContext.Provider value={{ isSearchVisible, setIsSearchVisible }}>
            {children}
        </SearchContext.Provider>
    );
};