import { FC, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { groupContactsStore } from 'src/store/groupContactsStore'
import { observer } from 'mobx-react-lite'

export const GroupListPage: FC = observer(() => {
  const groupContacts = groupContactsStore.groupContacts

  useEffect(() => {
    groupContactsStore.get()
  }, [])

  if (groupContacts.length === 0) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
  }

  return (
    <Row xxl={4}>
      {groupContacts.map((groupContact) => (
        <Col key={groupContact.id} style={{ margin: '1rem 0' }}>
          <GroupContactsCard groupContact={groupContact} withLink />
        </Col>
      ))}
    </Row>
  )
})
