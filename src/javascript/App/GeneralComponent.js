import React from 'react';

const GeneralComponent = ({
  type,
  children
}) => {
    return <div>
      <p>{type}</p>
      {children.length > 0 ? children.map(child=><GeneralComponent type={child.type} children={child.children} />):<div>No More Children Left</div>}
    </div>
}

export default GeneralComponent;
