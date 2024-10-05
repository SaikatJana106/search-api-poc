import React, { useState } from 'react';
import Navigationbar from './components/Navigationbar';
import DataDisplay from './components/DataDisplay';

const App = () => {
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    contentType: 'all',
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Navigationbar onSearch={handleSearch} />
      <DataDisplay searchFilters={searchFilters} />
    </div>
  );
};

export default App;
