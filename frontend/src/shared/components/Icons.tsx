import "@phosphor-icons/web/fill"
import "@phosphor-icons/web/duotone"
export const Icons = ({
  weight,
  variant,
  className
}: {
  weight: string
  variant: string
  className?: string
}) => {
  return <i className={`ph-${weight} ph-${variant.toLowerCase()} ${className}`} />
}
