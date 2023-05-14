import { Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { contactsStore } from 'src/store/contactsStore'
import { groupContactsStore } from 'src/store/groupContactsStore'
import { observer } from 'mobx-react-lite'

interface BreadcrumbsProps {
  pathNames: string[]
}

export const Breadcrumbs = observer<BreadcrumbsProps>(({ pathNames }) => {
  const contacts = contactsStore.contacts
  const groupContacts = groupContactsStore.groupContacts

  const getContactById = (id: string) => {
    return contacts?.find((c) => c.id === id)
  }

  const getGroupContactById = (id: string) => {
    return groupContacts?.find((g) => g.id === id)
  }

  const newPathNames = pathNames.map((item) => getContactById(item)?.name || getGroupContactById(item)?.name || item)
  return (
    <Row>
      <Col className={'mb-4'}>
        <ListGroup horizontal>
          <ListGroup.Item>
            {' '}
            <Link to={'/'}>Home</Link>{' '}
          </ListGroup.Item>
          {newPathNames.map((name, index) => {
            const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`

            // Определяем, является ли текущий элемент последним в списке
            const isLast = index === pathNames.length - 1

            return (
              <ListGroup.Item key={routeTo}>
                {isLast ? (
                  <span className={'active'}>{name}</span>
                ) : (
                  <Link to={routeTo} className={'link active'}>
                    {name}
                  </Link>
                )}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Col>
    </Row>
  )
})
