import './content-wrapper.css'

export const ContentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
      <div className={(className ?? '') + ' content'} >
        {children}
      </div>
)};
