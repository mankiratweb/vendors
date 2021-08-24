import React from 'react';
import SubCatAdd from '../Pages/subCat/SubCatAdd';
 

function GetCatData() {
  

  function getData(){
alert("HElo It Is Run")
      }
    
    return (
        <div>
          <SubCatAdd data={getData} />
        </div>
    )
}

export default GetCatData;
