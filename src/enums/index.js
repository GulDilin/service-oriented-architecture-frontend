function generateEnumeration(data) {
  return {
    ...data,

    getByKey(key) {
      let dataKeys = {};
      Object.entries(data).forEach( ([entryKey, { key }]) => {
        dataKeys[key] = this[entryKey];
      })
      return dataKeys[key];
    },

    getValues: () => Object.values(data),
  }
}

const Filtering = generateEnumeration(Object.freeze({
  EQUALS: { key: 'eq', text: 'equals' },
  CONTAINS: { key: 'in', text: 'contains' },
  LESS_THAN: { key: 'lt', text: 'less than' },
  GREATER_THAN: { key: 'gt', text: 'greater than' },
  LESS_THAN_OR_EQUALS: { key: 'lte', text: 'greater than' },
  GREATER_THAN_OR_EQUALS: { key: 'gte', text: 'greater than' },
  IS_NULL: { key: 'isnull', text: 'Is null' },
}))

const Climate = generateEnumeration(Object.freeze({
  RAIN_FOREST: { key: 'RAIN_FOREST' },
  MONSOON: { key: 'MONSOON' },
  SUBARCTIC: { key: 'SUBARCTIC' }
}))

const SortingMode = generateEnumeration(Object.freeze({
  ASC: { key: 'ASC', value: '+' },
  DESC: { key: 'DESC', value: '-' },
  UNSET: { key: 'UNSET', value: undefined }
}))

const FilteringCombinations = Object.freeze({
  CONTAINS: [ Filtering.CONTAINS, Filtering.EQUALS, Filtering.IS_NULL ],
  EQUALS: [ Filtering.EQUALS, Filtering.IS_NULL ],
  COMPARABLE: Filtering.getValues(),
})

export default Object.freeze({
  Filtering,
  FilteringCombinations,
  Climate,
  SortingMode,
});
