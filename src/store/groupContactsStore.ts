import { makeAutoObservable } from 'mobx'
import { api } from 'src/api'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const groupContactsStore = makeAutoObservable({
  groupContacts: [] as GroupContactsDto[],

  *get() {
    const result: GroupContactsDto[] = yield api.getGroupContacts()
    groupContactsStore.groupContacts = result
  },
})
