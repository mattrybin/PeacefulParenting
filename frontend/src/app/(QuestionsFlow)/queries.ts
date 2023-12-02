import { useQuery } from '@tanstack/react-query'
import { sleep } from 'shared/utils'

// import { defaultData } from './opportunities/page.specs'

let questions = [
  {
    id: "1",
    title: `As my little one begins to experience a wider range of emotions, what strategies or games could help them understand and express these feelings in a healthy, age-appropriate way?`,
    votes: 7,
    answers: 3,
    approved: true,
    views: 419,
    type: "toddler",
    user: "Antoni",
    userImage: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    timeAgo: "2 min ago"
  },
  {
    id: "2",
    title: `It's natural for young children to be scared of the unknown or everyday things. What can I do, or stories can I tell, to reassure them and reduce their fears during these startling moments?`,
    votes: 0,
    answers: 1,
    approved: false,
    views: 182,
    type: "teen",
    user: "Michel Floyd",
    userImage: "https://i.pravatar.cc/150?img=3",
    timeAgo: "53 min ago"
  },
  {
    id: "3",
    title: `It's not uncommon to feel frustrated when dealing with the challenges of this age. How can I effectively manage my own feelings, so it doesn't impact my child negatively during these teaching moments?`,
    votes: 0,
    answers: 0,
    views: 92,
    type: "preteen",
    user: "Michel Floyd",
    userImage: "https://i.pravatar.cc/150?img=3",
    timeAgo: "53 min ago"
  }
]
export const useQuestionsQuery = () =>
  useQuery({
    queryKey: ['opportunities'],
    queryFn: async () => {
      await sleep(2000)
      return questions
    },
  })
