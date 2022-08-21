import i18n from '@/i18n/index'

const t = i18n.global.t

export default () => {
  return [
    {
      // 排名
      label: t('msg.article.ranking'),
      prop: 'ranking'
    },
    {
      // 标题
      label: t('msg.article.title'),
      prop: 'title'
    },
    {
      // 作者
      label: t('msg.article.author'),
      prop: 'author'
    },
    {
      // 发布时间
      label: t('msg.article.publicDate'),
      prop: 'publicDate'
    },
    {
      // 内容介绍
      label: t('msg.article.desc'),
      prop: 'desc'
    },
    {
      // 操作
      label: t('msg.article.action'),
      prop: 'action'
    }
  ]
}
