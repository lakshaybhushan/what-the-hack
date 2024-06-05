import React from "react"

type InputProps = {
  handleSubmitFn: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormInput = ({ handleSubmitFn }: InputProps) => {
  return (
    <form
      onSubmit={handleSubmitFn}
      className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 pt-8 pb-2">
      <input
        type="text"
        name="hnUrl"
        placeholder="https://news.ycombinator.com/item?id="
        className="w-full min-w-[40vw] sm:w-96 rounded-full px-6 py-3 text-primary font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-linear border-2 border-primary/40 placeholder:text-primary/50"
      />
      <button
        type="submit"
        className="bg-primary rounded-full px-6 py-3 text-background font-medium hover:bg-primary/60 transition-all duration-300 ease-linear w-full sm:w-auto">
        Let&apos;s Go!
      </button>
    </form>
  )
}

export default FormInput
