<template>
  <svg
    v-if="!src"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :class="computedClasses"
    v-html="titleCode + iconCode"
  ></svg>
  <img
    v-else
    :src="src"
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
    src: String
  },
  computed: {
    iconName () {
      const iconNameIsKebabCase = this.name && this.name.includes('-')
      return iconNameIsKebabCase ? this.toCamelCase(this.name) : this.name
    },
    titleCode () {
      return this.iconName ? `<title>${this.iconName}</title>` : ''
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

<style>
.c-icon {
  display: inline-block;
  color: inherit;
  text-align: center;
  fill: currentColor;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
}

.c-icon-2xl {
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
}

.c-icon-3xl {
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
}

.c-icon-4xl {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
}

.c-icon-5xl {
  width: 5rem;
  height: 5rem;
  font-size: 5rem;
}

.c-icon-6xl {
  width: 6rem;
  height: 6rem;
  font-size: 6rem;
}

.c-icon-7xl {
  width: 7rem;
  height: 7rem;
  font-size: 7rem;
}

.c-icon-8xl {
  width: 8rem;
  height: 8rem;
  font-size: 8rem;
}

.c-icon-9xl {
  width: 9rem;
  height: 9rem;
  font-size: 9rem;
}

.c-icon-xl {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
}

.c-icon-lg {
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
}

.c-icon-sm {
  width: 0.875rem;
  height: 0.875rem;
  font-size: 0.875rem;
}

.c-icon-c-s,
.c-icon-custom-size {
  width: initial !important;
  height: initial !important;
}
</style>