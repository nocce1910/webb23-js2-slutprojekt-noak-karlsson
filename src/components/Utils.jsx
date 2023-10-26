
export const  groupItemsById = (cart) => {
    const groupedItems = {};

    for (const item of cart) {
      const { name } = item;
      if (!groupedItems[name]) {
        groupedItems[name] = [];
      }

      groupedItems[name].push(item);
    }

    return groupedItems;
  };


export const amountInCart = (cart) => {
    let amount = 0 

    Object.values(cart).forEach((group) => {
            amount += 1
      });

    return amount;
  };

  