import { fallbackLocale } from '@/utils/locale';
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${fallbackLocale}`);
}
