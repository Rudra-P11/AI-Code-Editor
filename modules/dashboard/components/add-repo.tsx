
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

const AddRepo = () => {
  return (
    <div
      className="group relative rounded-xl px-6 py-8 flex flex-row justify-between items-center border border-accent/20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-500/10 dark:via-accent/5 dark:to-pink-500/10 cursor-pointer overflow-hidden
      transition-smooth hover:border-accent/50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:via-transparent group-hover:to-pink-500/10 transition-all duration-500" />
      
      <div className="relative flex flex-row justify-center items-start gap-4 z-10">
        <div className="flex justify-center items-center w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:scale-110 transition-smooth">
          <ArrowDown size={28} className="transition-transform duration-300 group-hover:translate-y-1" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Open Repository
          </h1>
          <p className="text-sm text-muted-foreground max-w-[200px]">Import and work with GitHub repos</p>
        </div>
      </div>

      <div className="relative overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
        <Image
          src={"/github.svg"}
          alt="Open GitHub repository"
          width={120}
          height={120}
          className="opacity-60 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  )
}

export default AddRepo


