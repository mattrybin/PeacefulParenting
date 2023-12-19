import "@phosphor-icons/web/fill"
import "@phosphor-icons/web/duotone"
import "@phosphor-icons/web/bold"
export const Icons = ({
  weight,
  variant,
  className,
  size = "4"
}: {
  weight: "fill" | "duotone" | "bold"
  variant: string
  className?: string
  size?: string
}) => {
  return <i className={`ph-${weight} ph-${variant.toLowerCase()} text-${size} ${className}`} />
}
