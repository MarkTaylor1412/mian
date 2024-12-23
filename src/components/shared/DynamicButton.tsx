"use client";

import { LoaderCircle, PlusCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const DynamicButton = ({
  type,
  className,
}: {
  type: "edit-profile" | "add-post";
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {type === "edit-profile" && (
        <Button
          className={`disabled:cursor-not-allowed ${className}`}
          disabled={pending}
        >
          {pending ? (
            <span className="flex-center flex-row gap-1">
              <LoaderCircle className="animate-spin" />
              Saving
              <span className="animate-bounce transition duration-1000 repeat-infinite">
                .
              </span>
              <span className="animate-bounce transition delay-100 duration-1000 repeat-infinite">
                .
              </span>
              <span className="animate-bounce transition delay-200 duration-1000 repeat-infinite">
                .
              </span>
            </span>
          ) : (
            <span className="flex-center flex-row gap-1">
              <Save />
              Save
            </span>
          )}
        </Button>
      )}

      {type === "add-post" && (
        <button
          className={`disabled:cursor-not-allowed ${className}`}
          disabled={pending}
        >
          {pending ? (
            <span className="flex-center flex-row gap-1">
              {/* <LoaderCircle className="animate-spin" /> */}
              <span className="animate-bounce transition duration-1000 repeat-infinite">
                .
              </span>
              <span className="animate-bounce transition delay-100 duration-1000 repeat-infinite">
                .
              </span>
              <span className="animate-bounce transition delay-200 duration-1000 repeat-infinite">
                .
              </span>
            </span>
          ) : (
            <span className="flex-center flex-row gap-1">
              <PlusCircle />
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default DynamicButton;
