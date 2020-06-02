<template>
  <svg
    v-if="!src && !use"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :class="computedClasses"
    v-html="titleCode + iconCode"
    role="img"
  ></svg>
  <img
    v-else-if="src"
    :src="src"
    role="img"
  />
  <svg
    v-else-if="use"
    xmlns="http://www.w3.org/2000/svg"
    :class="computedClasses"
    role="img"
  >
    <use :href="use"></use>
  </svg>
</template>

<script>
export default {
  name: 'CIcon',
  props: {
    name: String,
    content: [String, Array],
    size: {
      type: String,
      validator: size => [
        'custom', 'custom-size', 'sm', 'lg', 'xl',
        '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
      ].includes(size)
    },
    customClasses: [String, Array, Object],
    src: String,
    title: String,
    use: String
  },
  computed: {
    iconName () {
      const iconNameIsKebabCase = this.name && this.name.includes('-')
      return iconNameIsKebabCase ? this.toCamelCase(this.name) : this.name
    },
    titleCode () {
      return this.title ? `<title>${this.title}</title>` : ''
    },
    code () {
      if (this.content) {
        return this.content
      } else if (this.$root.$options.icons) {
        const icon = this.$root.$options.icons[this.iconName]
        if (!icon && process && process.env && process.env.NODE_ENV === 'development') {
          console.error('CIcon: "' + this.iconName + '" is not registered in $root.icons object. For CIcon docs visit https://coreui.io/vue/docs/components/icon.html')
        }
        return icon
      }
    },
    iconCode () {
      return Array.isArray(this.code) ? this.code[1] || this.code[0] : this.code
    },
    scale () {
      return Array.isArray(this.code) && this.code.length > 1 ? this.code[0] : '64 64'
    },
    viewBox () {
      return this.$attrs.viewBox || `0 0 ${this.scale}`
    },
    computedSize () {
      const addCustom = !this.size && (this.$attrs.width || this.$attrs.height)
      return this.size === 'custom' || addCustom ? 'custom-size' : this.size
    },
    computedClasses () {
      const size = this.computedSize
      return this.customClasses || ['c-icon', { [`c-icon-${size}`]: size }]
    }
  },
  methods: {
    toCamelCase (str) {
      return str.replace(/([-_][a-z0-9])/ig, ($1) => {
        return $1.toUpperCase()
      }).replace(/-/ig, '')
    }
  }
}
</script>