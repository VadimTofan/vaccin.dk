const supportedLanguages = ['da', 'en', 'sv', 'ru', 'el'];

function validateValue(reference, candidate, valuePath, errors) {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      errors.push(`${valuePath} must contain ${reference.length} items`);
      return;
    }

    reference.forEach((item, index) => {
      validateValue(item, candidate[index], `${valuePath}[${index}]`, errors);
    });
    return;
  }

  if (reference !== null && typeof reference === 'object') {
    if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
      errors.push(`${valuePath} must be an object`);
      return;
    }

    for (const [key, value] of Object.entries(reference)) {
      validateValue(value, candidate[key], `${valuePath}.${key}`, errors);
    }
    return;
  }

  if (typeof candidate !== typeof reference) {
    errors.push(`${valuePath} must be a ${typeof reference}`);
    return;
  }

  if (typeof reference !== 'string') {
    return;
  }

  if (reference.trim() !== '' && candidate.trim() === '') {
    errors.push(`${valuePath} must not be blank`);
  }

  if ((valuePath.endsWith('.href') || valuePath.endsWith('.sourceHref'))
    && candidate !== reference) {
    errors.push(`${valuePath} must match the English route`);
  }
}

export function validateCountry(country) {
  const errors = [];
  const reference = country?.en;

  if (!reference) {
    return ['en language content is required'];
  }

  for (const language of supportedLanguages) {
    if (!country[language]) {
      errors.push(`${language} language content is required`);
      continue;
    }

    validateValue(reference, country[language], language, errors);
  }

  return errors;
}
