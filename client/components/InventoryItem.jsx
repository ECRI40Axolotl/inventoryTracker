/* eslint-disable react/prop-types */
import React, { Component, useState, useEffect } from 'react';

import UpdateModal from './UpdateModal.jsx';

function InventoryItem({ item }) {
  const [inStock, setStock] = useState(false);
  const [modalState, setModalState] = useState(false);

  const deleteItem = async (idNum) => {
    try {
      const deletedItem = await fetch('/fridge/deleteItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ id: idNum }),
      });
      console.log(deletedItem);
      return window.location.reload(false);
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  };

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  useEffect(() => {
    if (item._id) {
      setStock(true);
    }
  });

  return (
    <div id='inventoryList'>
      <section className='inventoryItem'>
        <div className='itemInfo'>
          <h2>{item.item_name}</h2>
          {/* Will show information if it exists in inventory */}
          {inStock && (
            <div>
              <ul className='inventoryTableInfo'>
                <li className='itemDetail'>
                  <span className='detailTitle'>Expiration Date:</span>{' '}
                  {item.expiration}
                </li>
                <li className='itemDetail'>
                  <span className='detailTitle'>Bought On:</span>{' '}
                  {item.date_bought}
                </li>
                <li className='itemDetail'>
                  <span className='detailTitle'>Status:</span> {item.status}
                </li>
              </ul>
              {modalState && (
                <UpdateModal closeModal={closeModal} itemInfo={item} />
              )}
              <div className='itemButtons'>
                {/* //TODO: Update button will need to trigger a modal or something that
        will allow you to edit fields before submitting changes */}
                <button className='updateInventory' onClick={openModal}>
                  Update Item
                </button>
                <button
                  className='deleteInventory'
                  onClick={() => {
                    //console.log('in click: ', item._id);
                    deleteItem(item._id);
                  }}>
                  Delete Item
                </button>
              </div>
            </div>
          )}
          {/* Will print this if there's no information besides item_name */}
          {!inStock && (
            <h3 className='outOfStock'>You are currently out of this item</h3>
          )}
        </div>
      </section>
    </div>
  );
}

export default InventoryItem;
