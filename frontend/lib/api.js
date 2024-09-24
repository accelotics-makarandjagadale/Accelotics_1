const API_URL = 'http://localhost:8000/api/contacts'; 


export async function fetchContacts() {
  const res = await fetch(`${API_URL}/list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch contacts');
    return [];
  }

  return res.json();
}


export async function deleteContact(id) {
  return fetch(`${API_URL}/delete/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}