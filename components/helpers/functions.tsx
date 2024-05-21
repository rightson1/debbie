import { toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "@/utils/firebase";

import { User } from "@/types";

export const customToast = ({
  userFunction,
  successFunc,
  loadingMessage,
  successMessage,
  errorMessage,
  errorFunc,
}: {
  userFunction: () => Promise<any>;
  successFunc?: () => void;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  errorFunc?: () => Promise<any> | (() => void);
}) => {
  return toast.promise(
    userFunction()
      .then(() => {
        if (successFunc) successFunc();
      })
      .catch(async (e) => {
        if (errorFunc) await errorFunc();
        console.log(e);
        throw e;
      }),
    {
      loading: loadingMessage || "Loading...",
      success: successMessage || "Success",
      error: errorMessage || "Something went wrong",
    }
  );
};
export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export function findItemIdByName<T extends { _id: string; name: string }>(
  name: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item.name === name);

  if (foundItem) {
    return foundItem._id;
  }
  return undefined;
}
export function findItemNameById<T extends { _id: string; name: string }>(
  id: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item._id === id);
  return foundItem?.name || "";
}

export const uselinks = (user: User) => {
  const menu = user.admin
    ? [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Voters",

          link: "/voters",
        },
        {
          name: "Candidates",

          link: "/candidates",
        },
        {
          name: "Notifications",

          link: "/notifications",
        },
        {
          name: "Settings",

          link: "/settings",
        },
        {
          name: "Miss Riara",

          link: "/miss-riara",
        },
        {
          name: "Mr riara",

          link: "/mr-riara",
        },
      ]
    : [
        {
          name: "Home",
          link: "/voter",
        },
        {
          name: "Voters",

          link: "/voter/voters",
        },
        {
          name: "Candidates",

          link: "/voter/candidates",
        },
        {
          name: "Notifications",

          link: "/voter/notifications",
        },
        {
          name: "Vote",

          link: "/voter/vote",
        },
      ];
  return menu;
};
