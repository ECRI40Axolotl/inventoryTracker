import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreateItem = () => {
  let [item_name, item_nameOnChange] = useInput('');
  const [expiration, expirationOnChange] = useInput('');
  const [bought_on, bought_onOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');

  const AddItem = () => {
    item_name = item_name.toLowerCase();

    const body = {
      item_name,
      expiration,
      bought_on,
      status,
    };

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
            required
            name='name'
            value={item_name}
            onChange={item_nameOnChange}
            placeholder={'Peanut Butter'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='expiration_date'>Expiration Date : </label>
          <input
            required
            name='expiration_date'
            value={expiration}
            onChange={expirationOnChange}
            placeholder={'YYYY-MM-DD'}
          />
        </div>
        <div className='inventoryFields'>
          <label htmlFor='bought_on'>Bought On: </label>
          <input
            required
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
