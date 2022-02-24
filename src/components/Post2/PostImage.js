import React from "react";

function PostImage ({ url, desc, onClick }) {
   const defaultUrl = `https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`;
   return (<div className="glassModel postImage" onDoubleClick={onClick}>
      <img src={url ? "/api/images/download/" + url : defaultUrl} alt={desc} />
   </div>);
}

export default React.memo(PostImage);