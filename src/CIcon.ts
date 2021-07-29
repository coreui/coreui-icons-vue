import { defineComponent, h, inject } from 'vue'

const CIcon = defineComponent({
  name: 'CIcon',
  props: {
    content: {
      type: [String, Array],
      default: undefined,
      required: false,
    },
    customClasses: {
      type: [String, Array, Object],
      default: undefined,
      required: false,
    },
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    size: {
      type: String,
      default: undefined,
      required: false,
      validator: (value: string) => {
        return [
          'custom',
          'custom-size',
          'sm',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
          '7xl',
          '8xl',
          '9xl',
        ].includes(value)
      },
    },
    src: {
      type: String,
      default: undefined,
      required: false,
    },
    title: {
      type: String,
      default: undefined,
      required: false,
    },
    use: {
      type: String,
      default: undefined,
      required: false,
    },
  },
  setup(props, { attrs }) {

    const icons: any = inject('icons')
    console.log(icons)

    const toCamelCase = (str: string) => {
      return str
        .replace(/([-_][a-z0-9])/gi, ($1) => {
          return $1.toUpperCase()
        })
        .replace(/-/gi, '')
    }

    const iconName = (() => {
      const iconNameIsKebabCase = props.name && props.name.includes('-')
      return iconNameIsKebabCase ? props.name && toCamelCase(props.name) : props.name
    })()

    const titleCode = props.title ? `<title>${props.title}</title>` : ''

    const code = (() => {
      if (props.content) {
        return props.content
      } else if (icons) {
        const icon = iconName && icons[iconName]
        if (!icon && process && process.env && process.env.NODE_ENV === 'development') {
          console.error(
            'CIcon: "' +
              iconName +
              '" is not registered in icons object. For CIcon docs visit https://coreui.io/vue/docs/components/icon.html',
          )
        }
        return icon
      }
    })()

    const iconCode = Array.isArray(code) ? code[1] || code[0] : code

    const scale = Array.isArray(code) && code.length > 1 ? code[0] : '64 64'

    const viewBox = attrs.viewBox || `0 0 ${scale}`

    // const size = () => {
    //   const addCustom = !props.size && (attrs.width || attrs.height)
    //   return props.size === 'custom' || addCustom ? 'custom-size' : props.size
    // }
    const classNames = props.customClasses || ['icon', { [`icon-${props.size}`]: props.size }]

    return () => [
      !props.src &&
        !props.use &&
        h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          class: classNames,
          viewBox: viewBox,
          innerHTML: `${titleCode} + ${iconCode}`,
          role: 'img',
        }),
      props.src &&
        !props.use &&
        h('img', {
          class: classNames,
          src: props.src,
          role: 'img',
        }),
      !props.src &&
        props.use &&
        h(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            class: classNames,
            role: 'img',
          },
          h('use', { href: props.use }),
        ),
    ]
  },
})
export { CIcon }
