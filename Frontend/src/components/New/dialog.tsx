import React from "react";
import { News } from "@/types/News.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Cross1Icon, EyeClosedIcon } from "@radix-ui/react-icons";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface NewsModalProps {
  news: News;
  onClose: () => void;
  open: boolean;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose, open }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[50vw] p-4 gap-4 overflow-y-scroll h-[60vh] sm:w-[100vw] rounded">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{news.title}</DialogTitle>
            <DialogClose onClick={onClose}>
              <Cross1Icon />
            </DialogClose>
          </div>
          <section className="flex items-center text-lg text-gray-400 mb-4 ">
            <p>
              {new Date(
                new Date().getTime() - news.published
              ).toLocaleDateString()}
            </p>
            <p className="mx-2">
              {" "}
              -{" "}
              {news.sponsor.substring(0, 1).toUpperCase() +
                news.sponsor.substring(1)}
            </p>
          </section>
        </DialogHeader>
        <section className="h-fit">
          {news.content.map((c, i) => (
            <p key={i} className="text-black mb-6 font-medium text-lg">
              {c}
            </p>
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
