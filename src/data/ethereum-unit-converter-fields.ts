const extendedFields: ConversionField[] = [
  {
    name: 'Enter Wei Value',
    placeHolder: 'Wei (10⁻¹⁸)',
    type: 'wei',
    value: ''
  },
  {
    name: 'Enter KWei / Babbage / Femtoether Value',
    placeHolder: 'KWei / Babbage / Femtoether (10⁻¹⁵)',
    type: 'kWei',
    value: ''
  },
  {
    name: 'Enter MWei / Lovelace / Picoether Value',
    placeHolder: 'MWei / Lovelace / Picoether (10⁻¹²)',
    type: 'mWei',
    value: ''
  },
  {
    name: 'Enter GWei / Shannon / Nanoether / Nano Value',
    placeHolder: 'Enter GWei / Shannon / Nanoether / Nano Value',
    type: 'gWei',
    value: ''
  },
  {
    name: 'Enter Szabo / Microether/ Micro Value',
    placeHolder: 'Szabo / Microether/ Micro (10⁻⁶)',
    type: 'szabo',
    value: ''
  },
  {
    name: 'Enter Finney / Milliether / Milli Value',
    placeHolder: 'Finney / Milliether / Milli (10⁻³)',
    type: 'finney',
    value: ''
  },
  {
    name: 'Enter Ether Value',
    placeHolder: 'Ether (1)',
    type: 'ether',
    value: ''
  },
  {
    name: 'Enter KEther / Grand Value',
    placeHolder: 'KEther / Grand (10³)',
    type: 'kEther',
    value: ''
  },
  {
    name: 'Enter MEther Value',
    placeHolder: 'MEther (10⁶)',
    type: 'mEther',
    value: ''
  },
  {
    name: 'Enter GEther Value',
    placeHolder: 'GEther (10⁹)',
    type: 'gEther',
    value: ''
  },
  {
    name: 'Enter TEther Value',
    placeHolder: 'TEther (10¹²)',
    type: 'tEther',
    value: ''
  }
]

const simpleFields: ConversionField[] = [
  {
    name: 'Enter Wei Value',
    placeHolder: 'Wei (10⁻¹⁸)',
    type: 'wei',
    value: ''
  },
  {
    name: 'Enter Gwei Value',
    placeHolder: 'GWei (10⁻⁹)',
    type: 'gWei',
    value: ''
  },
  {
    name: 'Enter Ether Value',
    placeHolder: 'Ether (1)',
    type: 'ether',
    value: ''
  }
]

const crumbs: BreadcrumbItem[] = [
  {
    link: '/',
    name: 'Home'
  },
  {
    link: '/web3-tools/',
    name: 'Web3 Tools'
  },
  {
    link: '#',
    name: 'Ethereum Unit Converter'
  }
]

export { crumbs, extendedFields, simpleFields }
