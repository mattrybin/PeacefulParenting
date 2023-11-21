import { get, writable } from 'svelte/store'
import * as R from "ramda"

export const items = [
  { id: 0, icon: 'egg-crack', title: 'Infancy', subtitle: '0-1 Years' },
  { id: 1, icon: 'Baby', title: 'Toddler', subtitle: '1-3 Years' },
  { id: 2, icon: 'Tooth', title: 'Child', subtitle: '3-8 Years' },
  { id: 3, icon: 'Backpack', title: 'Preteen', subtitle: '9-12 Years' },
  { id: 4, icon: 'PersonSimpleThrow', title: 'Teen', subtitle: '13-16 Years' },
  { id: 5, icon: 'GraduationCap', title: 'Adult', subtitle: '17-21 Years' },
  { id: 6, icon: 'HouseLine', title: 'Household', subtitle: 'Parents & kids' },
  { id: 7, icon: 'UsersThree', title: 'Relatives', subtitle: 'Beyond home' }
];
export const filter = writable<{ id: number; icon: string; title: string; subtitle: string } | undefined>(undefined)

export const switchFilter = (id: number) => {
  if (id === get(filter)?.id) {
    filter.set(undefined)
  } else {
    filter.set(R.find((x) => {
      return x.id === id
    }, items))
  }
}