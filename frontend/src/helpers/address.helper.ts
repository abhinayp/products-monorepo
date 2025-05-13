const STATE_ABBREVIATIONS = {
  CA: 'California',
  TX: 'Texas',
  NY: 'New York',
  FL: 'Florida',
  IL: 'Illinois',
  PA: 'Pennsylvania',
  OH: 'Ohio',
  GA: 'Georgia',
  NC: 'North Carolina',
  VA: 'Virginia',
  WA: 'Washington',
  AZ: 'Arizona',
  MA: 'Massachusetts',
  IN: 'Indiana',
  MO: 'Missouri',
  MN: 'Minnesota',
  MI: 'Michigan',
  WI: 'Wisconsin',
  KY: 'Kentucky',
  TN: 'Tennessee',
  HI: 'Hawaii',
  AK: 'Alaska',
  IA: 'Iowa',
  AR: 'Arkansas',
  LA: 'Louisiana',
  SD: 'South Dakota',
  ND: 'North Dakota',
  NE: 'Nebraska',
  KS: 'Kansas',
  DE: 'Delaware',
  DC: 'District of Columbia',
  MT: 'Montana',
  WY: 'Wyoming',
  UT: 'Utah',
  OK: 'Oklahoma',
  NM: 'New Mexico',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  RI: 'Rhode Island',
  SC: 'South Carolina',
}

const COUNTRY_ABBREVIATIONS = {
  US: 'United States',
  CA: 'Canada',
  MX: 'Mexico',
}

const getStateName = (stateAbbreviation: string) => {
  stateAbbreviation = stateAbbreviation.toUpperCase()
  return STATE_ABBREVIATIONS[stateAbbreviation as keyof typeof STATE_ABBREVIATIONS]
}

const getCountryName = (countryAbbreviation: string) => {
  countryAbbreviation = countryAbbreviation.toUpperCase()
  return COUNTRY_ABBREVIATIONS[countryAbbreviation as keyof typeof COUNTRY_ABBREVIATIONS]
}

export { getStateName, getCountryName }
