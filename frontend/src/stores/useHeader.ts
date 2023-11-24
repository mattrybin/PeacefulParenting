import { get, writable } from 'svelte/store'
import * as R from "ramda"

export const items = [
  { id: 0, icon: 'egg-crack', title: 'Infancy', subtitle: '0-1 Years' },
  { id: 1, icon: 'baby', title: 'Toddler', subtitle: '1-3 Years' },
  { id: 2, icon: 'tooth', title: 'Child', subtitle: '3-8 Years' },
  { id: 3, icon: 'backpack', title: 'Preteen', subtitle: '9-12 Years' },
  { id: 4, icon: 'person-simple-throw', title: 'Teen', subtitle: '13-16 Years' },
  { id: 5, icon: 'graduation-cap', title: 'Adult', subtitle: '17-21 Years' },
  { id: 6, icon: 'house-line', title: 'Household', subtitle: 'Parents & kids' },
  { id: 7, icon: 'users-three', title: 'Relatives', subtitle: 'Beyond home' }
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