import { PageContainer } from "shared/components/Containers"
import { useQuestion } from "./page.hook"
import Markdown from "react-markdown"
import { Icons } from "shared/components/Icons"

const markdown = `Let me be clear. I'm not worried about her behavior or think it is abnormal or anything. I am just looking for feedback on how I handled the situation and/or tips on how to approach similar cases.

My daughter was going to a friend's birthday party at a bowling alley. She knew ~50% of the kids. When she got there she sat alone for over 15 minutes, saying she didn't know everyone and that she didn't want to play or talk to anyone. I asked her if she was having fun and she said s was not, and then she wanted to hug on me, holding on to my arm for several minutes. I told her I'd give her a quick hug but that I'd sit behind her so that she could approach other kids and to only come to me if she needed to. My intent was to show support without being a crutch or a replacement for talking to people. Eventually she started to bowl on an empty lane, and when the other children came over she was talking to them. But even so she took her stuffed toy with her and wouldn't put it down even while bowling.

I think it was her just being overwhelmed, and I think I had the right response. She is diagnosed with ADHD but I don't known if that is a factor. I find it interesting that she was flip a switch between being super outgoing and making friends wherever she goes, or acting very withdrawn and shy. I think either one would be within "normal" healthy limits but I'm seeing a very divergent pattern and can't predict how she'll respond in different situations. Which I guess is expected of a 7 year old.

I added the attachment tag because I had to break away from her hugging my arm and ask her to at least sit (where she could see me) by herself rather than holding on to me for more than a few minutes.
`

export default function HomePage() {
  const { title, category } = useQuestion()
  return (
    <PageContainer>
      <div className="border-b">
        <div className=" grid gap-2 p-6">
          <div className="text-xl font-semibold">{title}</div>
          <div>
            <div className="text-lg">Asked yesterday by:</div>
            <div className="text-lg">Matt Rybin</div>
          </div>
        </div>
        <div className="grid grid-flow-col grid-cols-2 justify-between border-t text-center h-16">
          <div className="border-r flex items-center text-left justify-center gap-2">
            <Icons
              variant={category.icon}
              weight={"duotone"}
              size="7"
            />
            <div className="leading-5">
              <div className="font-semibold">{category.title}</div>
              <div>{category.subtitle}</div>
            </div>
          </div>
          <div className="self-center flex justify-center gap-2">
            <div className="font-semibold">123 Views</div>
          </div>
        </div>
      </div>
      <div>
        <Markdown className="px-6 py-6 prose">{markdown}</Markdown>
      </div>
    </PageContainer>
  )
}
