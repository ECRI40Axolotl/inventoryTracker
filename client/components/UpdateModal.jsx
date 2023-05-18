/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

function UpdateModal({ item, closeModal }) {
  const [expiration, expiration_dateOnChange] = useInput('');
  const [date_bought, bought_onOnChange] = useInput('');
  const [quantity, quantityOnChange] = useInput('');

  function UpdateItem() {
    const body = {
      id: item._id,
      expiration,
      date_bought,
      quantity,
    };
    console.log('body:', body);

    if (expiration === '') body.expiration = item.expiration;

    if (date_bought === '') body.date_bought = item.date_bought;

    if (quantity === '') body.quantity = item.quantity;

    fetch('/fridge', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then(() => closeModal())
      .catch((err) => console.log('UpdateItem fetch /create: ERROR: ', err));
  }

  return (
    <div>
      <div className='inventoryFields'>
        <label htmlFor='expiration_date'>Expiration Date : </label>
        <input
          type='date'
          name='expiration_date'
          value={expiration}
          onChange={expiration_dateOnChange}
          placeholder={'YYYY-MM-DD'}
        />
      </div>
      <div className='inventoryFields'>
        <label htmlFor='bought_on'>Bought On: </label>
        <input
          type='date'
          name='bought_on'
          value={date_bought}
          onChange={bought_onOnChange}
          placeholder={'YYYY-MM-DD'}
        />
      </div>
      <div className='inventoryFields'>
        <label htmlFor='quantity'>Quantity : </label>
        <input
          name='quantity'
          value={quantity}
          onChange={quantityOnChange}
          placeholder={'Full'}
        />
      </div>
      <div className='createButtonContainer'>
        <button
          type='button'
          className='btnMain'
          onClick={() => {
            UpdateItem();
            return window.location.reload(false);
          }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateModal;
