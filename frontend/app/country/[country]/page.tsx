import { redirect } from 'next/navigation';

import type { CountryRedirectPageProps } from './page.type';

export default function CountryRedirectPage({ params }: CountryRedirectPageProps) {
  const safeCountry = typeof params?.country === 'string' ? params.country : '';
  redirect(`/${safeCountry}`);
}
