export const HeaderSection = ({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) => (
  <div className="text-base-content text-xl max-content flex gap-2 items-center my-4">
    <i className={`ph-bold ph-${icon}`} />
    <span>{title}</span>
  </div>
);
