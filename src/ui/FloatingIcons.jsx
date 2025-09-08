import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


export const FloatingIcon = ({ 
  Icon, 
  className, 
  highlighted = false, 
  size = 24,
  style
}) => {
  return (
    <div 
      className={cn(
        "floating-icon absolute transition-all duration-300 hover:scale-110",
        highlighted 
          ? "bg-primary rounded-xl p-3 shadow-lg" 
          : "bg-white rounded-lg p-2 shadow-md",
        className
      )}
      style={style}
    >
      <Icon 
        size={size} 
        className={highlighted ? "text-white" : "text-muted-foreground"}
      />
    </div>
  );
};