'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { continentOrder } from './country-map.data';
import styles from './country-map.module.scss';

import type { CountryMapProps, MapContinent, MapCountry } from './country-map.type';

function sortCountriesByName(countries: MapCountry[]) {
  return [...countries].sort((a, b) => a.name.localeCompare(b.name));
}

export function CountryMap({ countries }: CountryMapProps) {
  const router = useRouter();

  const countriesByContinent = useMemo(() => {
    const grouped = new Map<MapContinent, MapCountry[]>();

    continentOrder.forEach((continent) => grouped.set(continent, []));

    countries.forEach((country) => {
      const list = grouped.get(country.continent);
      if (list) {
        list.push(country);
      }
    });

    return grouped;
  }, [countries]);

  return (
    <section className={styles.map} aria-label="Choose destination by continent">
      <div className={styles.map__continents}>
        {continentOrder.map((continent) => {
          const continentCountries = sortCountriesByName(countriesByContinent.get(continent) ?? []);

          return (
            <article key={continent} className={styles.map__continent_card}>
              <h3 className={styles.map__continent_title}>{continent}</h3>
              <label className={styles.map__label}>
                <span className={styles.map__label_text}>Choose country</span>
                <select
                  className={styles.map__select}
                  defaultValue=""
                  onChange={(event) => {
                    const selectedSlug = event.target.value;
                    if (selectedSlug) {
                      router.push(`/${selectedSlug}`);
                    }
                  }}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {continentCountries.map((country) => (
                    <option key={`${continent}-${country.slug}`} value={country.slug}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          );
        })}
      </div>
    </section>
  );
}
