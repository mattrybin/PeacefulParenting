"use client";
import { signOut } from "next-auth/react";
import { Icons } from "shared/components/Icons";
export const SignOutButton = () => (
  <button
    className="btn btn-outline grid h-24 items-center content-center"
    onClick={() => signOut()}
  >
    <div>
      <Icons variant="smiley-x-eyes" weight={"fill"} size="7" />
      <Icons variant="knife" weight={"fill"} size="7" />
    </div>
    <div>Signout</div>
  </button>
);
