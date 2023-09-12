import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreateItem = (props) => {
  const dateInputRef = useRef(null);

  const [item_name, nameOnChange] = useInput('');
  const [expiration_date, expiration_dateOnChange] = useInput('');
  const [bought_on, bought_onOnChange] = useInput('');
  const [quantity, quantityOnChange] = useInput('');

  const AddItem = () => {
    item_name = item_name.toLowerCase();

    const body = {
      item_name,
      expiration_date,
      bought_on,
      quantity,
    };

    if (item_name === '') throw Error('Item name is required');
    if (body.status === '') body.status = 'Full';

    fetch('/fridge/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log('CreateItem fetch /create: ERROR: ', err));
  };

  return (
    <section className='mainSection'>
      <header className='pageHeader'>
        <h2>Add an Inventory Item</h2>
        <Link to={'/main'}>
          <button type='button' className='btnSecondary'>
            Go Back
          </button>
        </Link>
      </header>
      <article className='card createItem'>
        <h3>Enter your Item information</h3>
        <div className='inventoryFields'>
          <label htmlFor='name'>Name: </label>
          <input
            name='name'
            value={item_name}
            onChange={nameOnChange}
            placeholder={'Peanut Butter'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='expiration_date'>Expiration Date : </label>
          <input
            name='expiration_date'
            value={expiration_date}
            onChange={expiration_dateOnChange}
            placeholder={'YYYY-MM-DD'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='bought_on'>Bought On: </label>
          <input
            name='bought_on'
            value={bought_on}
            onChange={bought_onOnChange}
            placeholder={'YYYY-MM-DD'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='status'>Status : </label>
          <input
            name='status'
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
              AddItem();
              return window.location.replace('http://localhost:8080/main');
            }}
          >
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default CreateItem;
