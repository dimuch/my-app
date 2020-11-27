import React from 'react';
import {AdmcNoData} from '../icon/icons';

const EmptyDataPlaceholder = () => {

  return (
    <div className="admc-empty-data-placeholder">
      <AdmcNoData />
      <span>No data to display</span>
    </div>
  );

};

export default EmptyDataPlaceholder;
