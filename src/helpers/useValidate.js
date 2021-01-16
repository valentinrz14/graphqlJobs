export function useValidateCountries(countries, cities) {
  const data = (value) => value.map(({ name }) => name);

  if (countries.length === 0 && cities.length === 0) {
    return 'Remote';
  } else if (countries.length > 0 && cities.length > 0) {
    return `${data(countries)}, ${data(cities)}`;
  } else if (countries.length > 0) {
    return data(countries);
  } else if (cities.length > 0) {
    return `${data(cities)}`;
  }
}

export function useValidateRemotes(remotes) {
  return remotes.length === 0 ? 'Presencial' : remotes.map(({ name }) => name);
}
