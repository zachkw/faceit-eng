export const API_BASE_URL = 'http://localhost:4000';

export const API_TOURNAMENTS_URL = `${API_BASE_URL}/tournaments`;

export const API_TOURNAMENTS_PATCH_URL = (id: string) =>
  `${API_TOURNAMENTS_URL}/${id}`;
