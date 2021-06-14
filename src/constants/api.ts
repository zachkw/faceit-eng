export const API_BASE_URL = 'http://localhost:4000';

export const API_TOURNAMENTS_URL_QUERY = (q?: string) =>
  `${API_BASE_URL}/tournaments/?q=${q?.trim().replace(' ', '+')}`;

export const API_TOURNAMENTS_URL = `${API_BASE_URL}/tournaments`;

export const API_TOURNAMENTS_URL_PATCH = (id: string) =>
  `${API_TOURNAMENTS_URL}/${id}`;
