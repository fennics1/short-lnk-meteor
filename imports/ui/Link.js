import React from 'react';

import LinksList from './LinksList';
import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksListFilter from './LinksListFilter';

//stateless functional component
export default () => {
  return (
    <div>
      <PrivateHeader title="Your Link"/>
      <div className="page-content">
        <LinksListFilter/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};
