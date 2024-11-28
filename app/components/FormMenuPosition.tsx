'use client'

import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  name: string;
  url: string;
}

export default function FormMenuPosition() {
  const { register, handleSubmit } = useForm<FormInputs>()
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data)

  return (
    <section className="flex gap-4 border border-[var(--greyLight)] rounded-lg bg-white py-5 px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-2 flex flex-col">
          <label className="font-medium text-sm text-[var(--greyDark) mb-[0.375rem]">Nazwa</label>
          <input {...register("name", { required: true })} type="text" className="shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] border border-[var(--greyLight)] rounded-lg py-2 px-3 text-[var(--greyLight2)] placeholder:text-[var(--greyLight2)]" placeholder="np. Promocje"/>
        </div>
        <div className="mb-2 flex flex-col">
          <label className="font-medium text-sm text-[var(--greyDark) mb-[0.375rem]">Link</label>
          <div className="flex items-center relative">
            <svg className="absolute left-[0.875rem] mr-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 16.5L13.5834 13.5833M15.6667 8.58333C15.6667 12.4954 12.4954 15.6667 8.58333 15.6667C4.67132 15.6667 1.5 12.4954 1.5 8.58333C1.5 4.67132 4.67132 1.5 8.58333 1.5C12.4954 1.5 15.6667 4.67132 15.6667 8.58333Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <input {...register("url")} type="text" className="w-full shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] border border-[var(--greyLight)] rounded-lg py-2 pl-[2.625rem] pr-[0.875rem] text-[var(--greyLight2)] placeholder:text-[var(--greyLight2)]" placeholder="Wklej lub wyszukaj"/>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border border-[var(--greyLight)] py-[0.625rem] px-[0.875rem] font-semibold text-sm text-[var(--greyDark)]">Anuluj</button>
          <input type="submit" className="shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border border-[var(--purpleLight)] py-[0.625rem] px-[0.875rem] font-semibold text-sm text-[var(--purpleDark)]" value="Dodaj"/>
        </div>
      </form>

      <div className="m-[0.625rem]">
        <svg className="w-5 h-5" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 1.5H11.5M1.5 4H16.5M14.8333 4L14.2489 12.7661C14.1612 14.0813 14.1174 14.7389 13.8333 15.2375C13.5833 15.6765 13.206 16.0294 12.7514 16.2497C12.235 16.5 11.5759 16.5 10.2578 16.5H7.74221C6.42409 16.5 5.76503 16.5 5.24861 16.2497C4.79396 16.0294 4.41674 15.6765 4.16665 15.2375C3.88259 14.7389 3.83875 14.0813 3.75107 12.7661L3.16667 4M7.33333 7.75V11.9167M10.6667 7.75V11.9167" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
