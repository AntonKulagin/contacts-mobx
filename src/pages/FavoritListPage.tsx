import { FC, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ContactCard } from 'src/components/ContactCard'
import { contactsStore } from 'src/store/contactsStore'
import { observer } from 'mobx-react-lite'

export const FavoritListPage: FC = observer(() => {
  const contacts = contactsStore.contacts

  useEffect(() => {
    contactsStore.get()
  }, [])

  if (contacts.length === 0) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
  }

  const favoriteContacts = contacts.filter((contact) => contact.favorite)

  return (
    <Row xxl={4} className='g-4'>
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  )
})
