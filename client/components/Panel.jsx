import React from 'react';

const Panel = (props) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h1 className="panel-title">{props.title}</h1>
      </div>
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  )
}

export default Panel;
