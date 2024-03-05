import { Icons } from "shared/components/Icons";
import { LeftSideBarButton } from "./LeftSideBarButton";

export const LeftSideBar = () => (
  <div className="font-semibold text-lg w-[175px] small:hidden desktop:block">
    <div>
      <LeftSideBarButton
        name="Account"
        iconWeight="fill"
        iconVariant="user-circle"
        href="http://frontend.peacefulparenting.local/login"
      />
      <LeftSideBarButton
        name="Chat AI"
        iconWeight="fill"
        iconVariant="wechat-logo"
        href="http://frontend.peacefulparenting.local/chat"
      />
      <LeftSideBarButton
        name="Resources"
        iconWeight="fill"
        iconVariant="book-bookmark"
        href="http://frontend.peacefulparenting.local/resources"
      />
      <LeftSideBarButton
        name="Questions"
        iconWeight="fill"
        iconVariant="seal-question"
        href="http://frontend.peacefulparenting.local/questions"
      />
    </div>
    <div>
      <LeftSideBarButton
        name="Saves"
        iconWeight="fill"
        iconVariant="bookmark-simple"
        href="{undefined}"
      />
    </div>
  </div>
);
