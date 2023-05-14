import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { FilterForm, FilterFormValues } from 'src/components/FilterForm'
import { contactsStore } from 'src/store/contactsStore'
import { groupContactsStore } from 'src/store/groupContactsStore'
import { ContactDto } from 'src/types/dto/ContactDto'

export const ContactListPage: FC = observer(() => {
  const [findContactsList, setFindContactsList] = useState<ContactDto[]>()

  const contacts = contactsStore.contacts
  const groupContacts = groupContactsStore.groupContacts

  useEffect(() => {
    contactsStore.get()
    groupContactsStore.get()
  }, [])

  useEffect(() => {
    setFindContactsList(contacts)
  }, [contacts])

  if (contacts === undefined || groupContacts === undefined || findContactsList === undefined) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
  }

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contacts

    if (fv.name) {
      const fvName = fv.name.toLowerCase()
      findContacts = findContacts.filter(({ name }) => name.toLowerCase().indexOf(fvName) > -1)
    }

    if (fv.groupId) {
      const groupContactsList = groupContacts.find(({ id }) => id === fv.groupId)

      if (groupContactsList) {
        findContacts = findContacts.filter(({ id }) => groupContactsList.contactIds.includes(id))
      }
    }

    setFindContactsList(findContacts)
  }

  return (
    <Row xxl={1}>
      <Col className='mb-3'>
        <FilterForm groupContactsList={groupContacts} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className='g-4'>
          {findContactsList.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
})
