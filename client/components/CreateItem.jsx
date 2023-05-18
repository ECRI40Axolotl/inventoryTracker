import React, { useState, useEffect, useRef } from 'react';
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
  const dateInputRef = useRef(null);

  let [item_name, nameOnChange] = useInput('');
  const [expiration, expiration_dateOnChange] = useInput('');
  const [date_bought, bought_onOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');

  const AddItem = () => {
    item_name = item_name.toLowerCase();
    const user_id = '1';

    const body = {
      item_name,
      expiration,
      date_bought,
      status,
      user_id
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
      .catch((err) =>
        console.log('CreateVegetable fetch /create: ERROR: ', err)
      );
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

          <label htmlFor='item_name'>Name: </label>
          <input
            name='item_name'
            value={item_name}
            onChange={nameOnChange}
            placeholder={'Peanut Butter'}
          />
        </div>

        <div className='inventoryFields'>
          <label htmlFor='date_bought'>Bought On: </label>
          <input
            type="date"
            name='date_bought'
            value={date_bought}
            onChange={bought_onOnChange}
            placeholder={'YYYY-MM-DD'}
            ref={dateInputRef}
          />
        </div>

        <div className='inventoryFields'>
          <label htmlFor='expiration'>Expiration Date : </label>
          <input
            type="date"
            name='expiration'
            value={expiration}
            onChange={expiration_dateOnChange}
            placeholder={'YYYY-MM-DD'}
            ref={dateInputRef}
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
              return window.location.replace('http://localhost:8080/main');
            }}>
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default CreateItem;
