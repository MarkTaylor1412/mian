"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DynamicButton from "./DynamicButton";

const InfoEditCard = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [coverUrl, setCoverUrl] = useState<any>(false);

  const router = useRouter();

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    failed: false,
  });

  const closeModal = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div>
      <span
        onClick={() => setOpen(true)}
        className="link-button"
      >
        Edit Info
      </span>

      {open && (
        <div className="flex-center absolute -top-24 left-0 z-50 h-screen w-screen bg-black/60">
          <form
            action={(formData) =>
              formAction({ formData, coverUrl: coverUrl?.secure_url })
            }
            className="flex w-full flex-col gap-2 rounded-md bg-card p-12 shadow-md md:w-1/2 xl:w-2/5"
          >
            {/* //# Header */}
            <div className="flex flex-col gap-3 pb-6">
              <div className="flex-between flex-row gap-2">
                <span className="semibold-xl">{user.username}</span>
                <X
                  onClick={closeModal}
                  className="transform cursor-pointer transition-all duration-300 ease-in-out hover:rotate-90 hover:scale-150"
                />
              </div>

              <p className="light-sm text-muted-foreground">
                To update your Avatar or Username, use the User Button on the
                Navbar.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <Label>Cover</Label>
                <div className="flex-center flex-row gap-2">
                  <Image
                    alt="Cover"
                    src={user.coverUrl || "/cover.svg"}
                    width={128}
                    height={80}
                    className="h-20 w-32 cursor-pointer rounded-md object-cover"
                  />

                  <CldUploadWidget
                    uploadPreset="mian_platform"
                    onSuccess={(result, { widget }) => {
                      setCoverUrl(result.info);
                      widget.close();
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          onClick={() => open()}
                          className="extralight-xs cursor-pointer text-muted-foreground hover:text-primary"
                        >
                          Change
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </div>

              <div className="flex-between flex-wrap gap-4 xl:gap-8">
                {/* //# First Name */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder={user.firstname || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="firstname"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    First Name
                  </Label>
                </div>

                {/* //# Surname */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder={user.surname || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="surname"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    Surname
                  </Label>
                </div>

                {/* //# Bio */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder={user.bio || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="bio"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    Bio
                  </Label>
                </div>

                {/* //# Education */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="education"
                    name="education"
                    type="text"
                    placeholder={user.education || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="education"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    Education
                  </Label>
                </div>

                {/* //# Nationality */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="nationality"
                    name="nationality"
                    type="text"
                    placeholder={user.nationality || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="nationality"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    Nationality
                  </Label>
                </div>

                {/* //# External Link */}
                <div className="relative flex flex-col gap-2">
                  <Input
                    id="externalLink"
                    name="externalLink"
                    type="text"
                    placeholder={user.externalLink || " "}
                    className="peer transition-all focus:border-border"
                  />
                  <Label
                    htmlFor="externalLink"
                    className="absolute -top-1.5 left-3 cursor-text text-muted-foreground opacity-50 transition-all peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
                  >
                    External Link
                  </Label>
                </div>
              </div>

              {/* <Button
              // onClick={() =>
              // state.success && router.push(`/profile/${user.username}`)
              // }
              >
                Save
              </Button> */}
              <DynamicButton type="edit-profile" />
            </div>

            {state.success && (
              <span className="text-[green]">
                Your information has been updated successfully,{" "}
                <b>{user.username}</b>!
              </span>
            )}
            {state.failed && (
              <span className="text-[red]">
                We could not update your information, <b>{user.username}</b>.
                Please try again later!
              </span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoEditCard;
