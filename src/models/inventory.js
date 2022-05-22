const Inventory = {

  async addItem(data, item) {
    const findItem = data.inventory.find(i => i.name.pt === item.name.pt);
    if (!findItem) {
      data.inventory.push(item);
    } else {
      const position = data.inventory.findIndex(i => i.name.pt === item.name.pt);
      item.count = data.inventory[position].count + 1;
      data.inventory[position] = item;
    }
    await data.save();
  },
  
};

module.exports = Inventory;
