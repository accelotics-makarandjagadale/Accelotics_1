export async function fetchContacts() {
  const res = await fetch('http://localhost:8000/api/contacts/list/');
  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return res.json();
}

export async function deleteContact(id) {
  try {
    const res = await fetch(`http://localhost:8000/api/contacts/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Optional: Specify content type if needed
      },
    });

    if (!res.ok) {
      // Handle unsuccessful deletion attempts
      const errorMessage = await res.text(); // Optionally get response text for more info
      throw new Error(`Failed to delete contact: ${errorMessage}`);
    }

    return res;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { ok: false }; // Return an object indicating failure
  }
}