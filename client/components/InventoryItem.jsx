import React from 'react';

const inventoryItemCard = ({item}) => {
  const { item_name, item_id, expiration, date_bought } = item;

  return (
    <article className='inventoryItemCard'>
      <h2>{item_name}</h2>
    </article>
  )
}

export default inventoryItemCard;