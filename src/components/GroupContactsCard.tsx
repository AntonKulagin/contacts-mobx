import { useRef } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { observer } from 'mobx-react-lite'

interface GroupContactsCardProps {
  groupContact: GroupContactsDto
  withLink?: boolean
}

export const GroupContactsCard = observer<GroupContactsCardProps>(
  ({ groupContact: { id, name, description, photo, contactIds }, withLink }) => {
    const titleRef = useRef<any>()

    const handleImageClick = () => {
      if (titleRef.current) {
        titleRef.current.click()
      }
    }
    return (
      <Card key={id} style={{ height: '100%' }}>
        <Card.Header>
          {withLink ? (
            <Link ref={titleRef} to={`/groups/${id}`}>
              {name}
            </Link>
          ) : (
            name
          )}
        </Card.Header>
        <Card.Body>{description}</Card.Body>
        <Card.Img variant='top' src={photo} onClick={handleImageClick} style={{ cursor: 'pointer' }} />
        <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
      </Card>
    )
  },
)
