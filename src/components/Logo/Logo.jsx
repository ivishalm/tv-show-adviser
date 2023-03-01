import s from "./style.module.css";
export function Logo({ logo, title, subtitle }) {
  return (
    <>
      <div className={s.container}>
        <img className={s.img} src={logo} alt="logo" />
        <div className={s.title}>{title}</div>
      </div>
      <div className={s.subtitle}>{subtitle}</div>
    </>
  );
}
