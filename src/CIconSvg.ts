import { cloneVNode, defineComponent } from 'vue'

const CIconSvg = defineComponent({
  name: 'CIconSvg',
  props: {
    /**
     * Use for replacing default CIconSvg component classes. Prop is overriding the 'size' prop.
     */
    customClassName: [String, Array, Object],
    /**
     * The height attribute defines the vertical length of an icon.
     */
    height: Number,
    /**
     * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
     */
    size: {
      type: String,
      validator: (value: string) => {
        return [
          'custom',
          'custom-size',
          'sm',
          'lg',
          'xl',
          'xxl',
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
    /**
     * Title tag content.
     */
    title: String,
    /**
     * The width attribute defines the horizontal length of an icon.
     */
    width: Number,
  },
  setup(props, { attrs, slots }) {
    return () =>
      slots.default &&
      slots.default().map((slot) =>
        cloneVNode(slot, {
          'aria-hidden': true,
          class: [
            props.customClassName || [
              'icon',
              {
                [`icon-${props.size}`]: props.size,
                [`icon-custom-size`]: props.height || props.width,
              },
              attrs.class,
            ],
          ],
          height: props.height,
          focusable: 'false',
          role: 'img',
          width: props.width,
          ...attrs,
        }),
      )
  },
})
export { CIconSvg }
