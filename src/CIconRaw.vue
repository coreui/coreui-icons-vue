<template>
  <svg
    v-if="!src"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :class="computedClasses"
    v-html="titleCode + iconCode"
    role="img"
  ></svg>
  <img
    v-else
    :src="src"
    role="img"
  />
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
        'custom-size', 'sm', 'lg', 'xl',
        '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
      ].includes(size)
    },
    customClasses: [String, Array, Object],
    src: String,
    title: String
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
        return this.$root.$options.icons[this.iconName]
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
      return this.$attrs.width || this.$attrs.height ? 'custom-size' : this.size
    },
    computedClasses () {
      return this.customClasses ||  
             ['c-icon', { [`c-icon-${this.computedSize}`]: this.computedSize }]
    }
  },
  methods: {
    toCamelCase (str) {
      return str.replace(/([-_][a-z0-9])/ig, ($1) => {
        return $1.toUpperCase().replace('-', '')
      })
    }
  }
}
</script>