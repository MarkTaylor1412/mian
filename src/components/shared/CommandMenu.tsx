"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="flex w-52 cursor-pointer flex-row items-center justify-between gap-4 *:size-fit *:text-muted-foreground *:hover:text-primary">
        <Button
          className="bg-transparent p-1"
          onClick={() => setOpen(!open)}
        >
          Search users...
        </Button>
        <kbd className="flex flex-row items-center justify-center rounded-md bg-muted px-1 tracking-widest">
          ⌘K
        </kbd>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTitle></DialogTitle>
        <CommandInput placeholder="Search users..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Users">
            <CommandItem>Georgia McKenzie</CommandItem>
            <CommandItem>Ricky Copeland</CommandItem>
            <CommandItem>Dora Daniels</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
