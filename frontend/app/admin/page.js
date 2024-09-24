import ContactList from '../../components/ContactList';

export default function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ContactList />  {/* Renders the contact list component */}
    </div>
  );
}