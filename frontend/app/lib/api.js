export async function fetchContacts() {
  const res = await fetch('http://localhost:8000/list/');
  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return res.json(); // Return the fetched contacts
}

export async function deleteContact(id) {
  try {
    // Ensure the URL matches your Django delete endpoint
    const res = await fetch(`http://localhost:8000/delete/${id}/`, {
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

    return res; // Return the response on success
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { ok: false }; // Return an object indicating failure
  }
}
