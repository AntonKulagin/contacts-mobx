import { ContactDto } from './types/dto/ContactDto'
import { GroupContactsDto } from './types/dto/GroupContactsDto'

class Api {
  async getContacts(): Promise<ContactDto[]> {
    const response = await fetch('http://localhost:3001/contacts').then((res) => res.json())
    return response
  }

  async updateContact(contact: ContactDto): Promise<ContactDto> {
    const response = await fetch(`http://localhost:3001/contacts/${contact.id}`, {
      method: 'PATCH',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    return response
  }

  async getGroupContacts(): Promise<GroupContactsDto[]> {
    const response = await fetch('http://localhost:3001/groupContacts').then((res) => res.json())
    return response
  }
}
export const api = new Api()
