export default Object.freeze({
  numberOrValue(v) {
    return isNaN(+v) ? v : +v;
  },

  mapNumberOrValueFields(item, fields) {
    fields.forEach( f => {
      item[f] = this.numberOrValue(item[f]);
    });
  }
})