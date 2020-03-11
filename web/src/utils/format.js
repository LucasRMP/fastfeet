export function formatId(id) {
  return `#${id > 9 ? id : `0${id}`}`;
}

export function stateUfToName(UF) {
  let name;
  switch (UF) {
    case 'AC':
      name = 'Acre';
      break;
    case 'AL':
      name = 'Alagoas';
      break;
    case 'AP':
      name = 'Amapá';
      break;
    case 'AM':
      name = 'Amazonas';
      break;
    case 'BA':
      name = 'Bahia';
      break;
    case 'CE':
      name = 'Ceará';
      break;
    case 'DF':
      name = 'Distrito Federal';
      break;
    case 'ES':
      name = 'Espírito Santo';
      break;
    case 'GO':
      name = 'Goiás';
      break;
    case 'MA':
      name = 'Maranhão';
      break;
    case 'MT':
      name = 'Mato Grosso';
      break;
    case 'MS':
      name = 'Mato Grosso do Sul';
      break;
    case 'MG':
      name = 'Minas Gerais';
      break;
    case 'PA':
      name = 'Pará';
      break;
    case 'PB':
      name = 'Paraíba';
      break;
    case 'PR':
      name = 'Paraná';
      break;
    case 'PE':
      name = 'Pernambuco';
      break;
    case 'PI':
      name = 'Piauí';
      break;
    case 'RJ':
      name = 'Rio de Janeiro';
      break;
    case 'RN':
      name = 'Rio Grande do Norte';
      break;
    case 'RS':
      name = 'Rio Grande do Sul';
      break;
    case 'RO':
      name = 'Rond&ohat;nia';
      break;
    case 'RR':
      name = 'Roraima';
      break;
    case 'SC':
      name = 'Santa Catarina';
      break;
    case 'SP':
      name = 'São Paulo';
      break;
    case 'SE':
      name = 'Sergipe';
      break;
    case 'TO':
      name = 'Tocantins';
      break;
    default:
      name = UF;
      break;
  }
  return name;
}

export function dateToLocale(date) {
  return date
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
}
