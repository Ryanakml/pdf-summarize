import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function deleteButton() {
    return (
        <Button 
        variant={"ghost"}
        size={"icon"}
        className="text-gray-400 bg-gray-50 border border-gray-200
         hover:bg-purple-400 hover:text-gray-50
           transition-colors duration-200"
        >
            <Trash2 className="w-5 h-5" />
        </Button>
    )
}