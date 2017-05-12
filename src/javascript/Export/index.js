'use strict'

import React from 'react'

export class Export extends React.Component {
  state = {
  };

  render() {
    return (
      <div>
        {
            this.props.componentList.map((comp)=>{
               return <p>{comp.element}</p>
            })
        }
      </div>
    )
  }
}

export default Export;
