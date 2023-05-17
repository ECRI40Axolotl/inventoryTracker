import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreateItem = (props) => {
  let [name, nameOnChange] = useInput('');
  const [expiration_date, expiration_dateOnChange] = useInput('');
  const [bought_on, bought_onOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');

  const AddItem = () => {
    name = name.toLowerCase();

    const body = {
      name,
      expiration_date,
      bought_on,
      status,
    };

    if (name === '') throw Error('Item name is required');
    if (body.status === '') body.status = 'Full';

    fetch('/fridge/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((err) =>
        console.log('CreateVegetable fetch /create: ERROR: ', err)
      );
  };

  return (
    <section className='mainSection'>
      <header className='pageHeader'>
        <h2>Add an Inventory Item</h2>
        <Link to={'/'}>
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
            value={name}
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
            value={status}
            onChange={statusOnChange}
            placeholder={'Full'}
          />
        </div>
        <div className='createButtonContainer'>
          <button
            type='button'
            className='btnMain'
            onClick={() => {
              AddItem();
              return window.location.replace('http://localhost:8080');
            }}>
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default CreateItem;
