import { Textarea } from "@/components/ui/textarea"
import RowsContainer from "./RowsContainer"

export default function Editor() {
    return (
        <div className="flex w-200 h-120">
            <RowsContainer/>
            <Textarea/>
        </div>
    )
}

