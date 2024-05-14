import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface RegisterDialogProps {
  children: React.ReactNode;
  form: React.ReactNode;
  title: string;
}

export function HomeDialog({ children, form, title }: RegisterDialogProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[320px] bg-[rgb(27,32,40)]">
        <div className="top absolute w-full h-6 rounded-t-lg bg-gradient-to-r from-blue-600 to-gray-900"></div>
        <DialogHeader className="mt-4">
          <DialogTitle>
            <span className="text-white">{title}</span>
          </DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
