module.exports = function mergeObjectsById(obj1, obj2, array) {
  if (obj1.id === obj2.category.id) {
    array.push({
      id: obj1.id,
      name: obj1.name,
      color: obj1.color,
      amount: obj2.amount,
    });
  } else {
    return array.push({
      id: obj1.id,
      name: obj1.name,
      color: obj1.color,
    });
  }
}