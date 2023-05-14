import { makeAutoObservable } from 'mobx'
// import { ContactDto } from '../types/ContactDto'
import { api } from 'src/api'
import { ContactDto } from 'src/types/dto/ContactDto'

export const contactsStore = makeAutoObservable({
  contacts: [] as ContactDto[],
  *get() {
    const result: ContactDto[] = yield api.getContacts()
    contactsStore.contacts = result
  },
  *update(contact: ContactDto) {
    const result: ContactDto = yield api.updateContact(contact)
    contactsStore.contacts = contactsStore.contacts.map((c) => (result.id === c.id ? result : c))
  },
})
