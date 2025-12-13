
"use client";

import { Button } from "@/components/ui/button"
// import { createPlayground } from "@/features/playground/actions";
import { Plus } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";
import TemplateSelectingModal from "./template-selecting-modal";
import { createPlayground } from "../actions";

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  } | null>(null)
  const router = useRouter()


  const handleSubmit = async (data:{
      title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  })=>{
    setSelectedTemplate(data)

    const res = await createPlayground(data);
    toast.success("Playground Created successfully"
      
    )
    setIsModalOpen(false)
    router.push(`/playground/${res?.id}`)
  }


  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-xl px-6 py-8 flex flex-row justify-between items-center border border-primary/20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-500/10 dark:via-primary/5 dark:to-purple-500/10 cursor-pointer overflow-hidden
        transition-smooth hover:border-primary/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-500" />
        
        <div className="relative flex flex-row justify-center items-start gap-4 z-10">
          <div className="flex justify-center items-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-primary text-white shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:scale-110 transition-smooth">
            <Plus size={28} className="transition-transform duration-300 group-hover:rotate-90" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              Create New
            </h1>
            <p className="text-sm text-muted-foreground max-w-[200px]">Start a new coding project instantly</p>
          </div>
        </div>

        <div className="relative overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={"/add-new.svg"}
            alt="Create new playground"
            width={120}
            height={120}
            className="opacity-60 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
      <TemplateSelectingModal
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      onSubmit={handleSubmit}
      />
   
    </>
  )
}

export default AddNewButton
