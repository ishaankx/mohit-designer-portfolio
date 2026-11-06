import s from "./Button.module.css";

type Props = {
  children: string;
  href?: string;
  className?: string;
  external?: boolean;
  data?: Record<`data-${string}`, string>;
};

export default function Button({ children, href, className, external, data }: Props) {
  const cls = className ? `${s.btn} ${className}` : s.btn;
  const inner = (
    <>
      <span className={s.fill} aria-hidden="true" />
      <span className={s.label}>
        <span className={s.roll}>
          <span data-copy-text="">{children}</span>
          <span aria-hidden="true" data-copy-text="">
            {children}
          </span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} data-btn="" data-from="left" {...data} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} data-btn="" data-from="left" {...data}>
      {inner}
    </button>
  );
}
