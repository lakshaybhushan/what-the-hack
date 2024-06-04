import React from "react"

type InputProps = {
  handleSubmitFn: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormInput = ({ handleSubmitFn }: InputProps) => {
  return (
    <form
      onSubmit={handleSubmitFn}
      className="w-full py-4 sm:py-8 flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="text"
        name="hnUrl"
        placeholder="https://news.ycombinator.com/item?id="
        className="border border-gray-300 px-4 py-2 sm:px-6 sm:py-4 rounded-full w-full"
      />
      <button
        type="submit"
        className="p-2 sm:p-4 rounded-full bg-orange-400 text-orange-50 font-semibold w-full sm:w-64 md:hover:bg-orange-300 transition-all duration-300 ease-linear">
        Generate Summary
      </button>
    </form>
  )
}

export default FormInput
