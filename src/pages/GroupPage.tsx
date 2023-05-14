import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { Empty } from 'src/components/Empty'
import { ContactCard } from 'src/components/ContactCard'
import { contactsStore } from 'src/store/contactsStore'
import { groupContactsStore } from 'src/store/groupContactsStore'
import { observer } from 'mobx-react-lite'

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>()

  const contacts = contactsStore.contacts
  const groupContacts = groupContactsStore.groupContacts

  const groupContact = groupContacts?.find((c) => c.id === groupId)

  return (
    <Row className='g-4'>
      {groupContact ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className='mx-auto'>
                <GroupContactsCard groupContact={groupContact} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className='g-4'>
              {contacts?.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  )
})
