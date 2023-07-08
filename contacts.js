const fs = require("fs").promises;
const { readFile } = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const indexOfDeletedContact = contacts.findIndex((contact) => contact.id === contactId);

    if (indexOfDeletedContact === -1) {
      return null;
    } else {
      const deletedContact = contacts.splice(indexOfDeletedContact, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      return deletedContact;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const currentContacts = await listContacts();

    const newContact = {
      id: nanoid(21),
      name,
      email,
      phone,
    };

    const newContactsList = [...currentContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};