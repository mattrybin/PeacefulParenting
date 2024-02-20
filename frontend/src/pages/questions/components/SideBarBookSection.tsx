import Link from "next/link";
import { SideBarBook } from "./SideBarBook";
import { Icons } from "shared/components/Icons";

export const SideBarBookSection = () => {
  return (
    <div>
      <div className="flex text-lg font-bold items-center gap-2 pb-2 ">
        <Icons weight="bold" variant="book-open-text" size="xl" />
        <div>Books</div>
      </div>
      <SideBarBook
        imgLink="https://m.media-amazon.com/images/I/61YnzoPl9jL._AC_UF894,1000_QL80_.jpg"
        bookTitle="The Whole-Brain Child"
        author="by Daniel J. Siegel and Tina Payne Bryson"
        briefInfo=" 12 Revolutionary Strategies to Nurture Your Child's Developing Mind, Survive Everyday Parenting Struggles, and Help Your Family Thrive."
        href="https://www.amazon.pl/Whole-Brain-Child-Revolutionary-Strategies-Developing/dp/0553386697/ref=asc_df_0553386697/?tag=plshogostdde-21&linkCode=df0&hvadid=504403847427&hvpos=&hvnetw=g&hvrand=8126094771678206954&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9067437&hvtargid=pla-436541850135&psc=1&mcid=fd06019101df376c974fd03981a44a99"
      />
      <SideBarBook
        imgLink="https://m.media-amazon.com/images/I/71TWKixwzWL._AC_UF1000,1000_QL80_.jpg"
        bookTitle="Raising Good Humans"
        author="by Daniel J. Siegel and Tina Payne Bryson"
        briefInfo=" A Mindful Guide to Breaking the Cycle of Reactive Parenting and Raising Kind, Confident Kids."
        href="https://www.amazon.pl/Raising-Good-Humans-Parenting-Confident/dp/1684033888/ref=sr_1_1?crid=3MANKNTU7G6O8&dib=eyJ2IjoiMSJ9.M-w28wc1X0Z2vNwYlsYSh2gfLDpEY4Ri0cVXhbifwpwX6OwrSSUE8oLXpncMdfMv7HLQJgDZF-fqkgLxdOtJ80ZjD6UJynkpzbLdOqzOnF1LnTHpj2smFKfawxFSo_1k07qgJhHDhUuiL26TXwM4ZQ_uhQT-1oUf3BXkqD7RcNHD5f9dBeHiaoUTx3a7KvlOpAVFMs2AugNVzWAdEbOaYDEFrQwQ6fRsLrglKV5saY2EH3VON5UabbIq9mT1iKSCOka0r1e7ExbT-KrBHFUwJyva5p3nNu1Y35P9_U3gpfQ.pFt6IBgHIKdkyNyIRbr0pcH9Y5E9D3DjvMQE-dg4zI8&dib_tag=se&keywords=raising+good+humans&qid=1708007963&sprefix=raising+%2Caps%2C239&sr=8-1"
      />
      <Link
        className="font-bold text-lg pt-3 hover:underline-offset-4 hover:underline-offset-3"
        href="http://frontend.peacefulparenting.local/resources"
      >
        More books...
      </Link>
    </div>
  );
};
