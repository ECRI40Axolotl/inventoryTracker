import React, { useState, useEffect } from 'react';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

function UpdateModal ({itemInfo, closeModal}) {
  const [expiration_date, expiration_dateOnChange] = useInput('');
  const [bought_on, bought_onOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');

    function UpdateItem () {
    const body = {
      item_name: itemInfo.item_name,
      expiration_date,
      bought_on,
      status,
    };

    fetch('/fridge/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then(()=> closeModal())
      .catch((err) =>
        console.log('UpdateItem fetch /create: ERROR: ', err)
      );
  };
  
  return (<div> 
    <div className='inventoryFields'>
          <label htmlFor='expiration_date'>Expiration Date : </label>
          <input 
            name='expiration_date' 
            value={expiration_date} 
            onChange={expiration_dateOnChange} 
            placeholder={"YYYY-MM-DD"}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='bought_on'>Bought On: </label> 
          <input
            name='bought_on'
            value={bought_on}
            onChange={bought_onOnChange}
            placeholder = {'YYYY-MM-DD'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='status'>Status : </label>
          <input
            name='status'
            value={status}
            onChange={statusOnChange}
            placeholder={'Full'}
          />
        </div>
        <div className='createButtonContainer'>
          <button
            type='button'
            className='btnMain'
            onClick={() => {UpdateItem();
              return window.location.reload(false);
            }}
          >
            Save
          </button> 
          </div>
          </div>
          )
          }

    export default UpdateModal;