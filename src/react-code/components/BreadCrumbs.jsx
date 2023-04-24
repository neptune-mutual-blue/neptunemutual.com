import { Icon } from './Icon'

const Breadcrumbs = (props) => {
  const t = (x) => x

  return (
    <ol className="breadcrumb trail" style={{ marginBottom: '36px' }}>
      {props.crumbs.map((item, i) => {
        return (
          <li
          key={i}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a
            itemProp="item"
            className="crumb"
            href={
              ['#', ''].includes(item.link)
                ? undefined
                : item.link
            }
            data-is-last={props.crumbs.length === i}
          >
            <span itemProp="name">{t(`${item.name}`)}</span>
          </a>
          {i < props.crumbs.length - 1 && (
            <Icon size={'md'} variant="chevron-right" />
          )}

          <meta itemProp="position" content={`${i + 1}`} />
        </li>
        )
      })}
    </ol>
  )
}

export { Breadcrumbs }
