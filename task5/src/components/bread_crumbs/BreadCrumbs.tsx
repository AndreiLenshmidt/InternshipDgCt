import Link from 'next/link';
import style from './bread-crumbs.module.css';

type LinkData = {
   text: string;
   url: string;
};

export function BreadCrumbs({ crumbs }: { crumbs: LinkData[] }) {
   return (
      <div className={style.bread_crumbs}>
         {crumbs.map((crumb, i) => {
            if (!i) return <Link href={crumb.url}>{crumb.text}</Link>;
            else
               return (
                  <>
                     <span>/</span>
                     <Link href={crumb.url}>{crumb.text}</Link>
                  </>
               )
         })}
      </div>
   );
}
