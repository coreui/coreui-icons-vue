import Vue from 'vue'

export declare class CIconRaw extends Vue {
  name?: string
  content?: string | Array<string>
  size?: string
  customClasses?: string | Array<any> | object
  src?: string
  title?: string
  use?: string
}

export declare class CIcon extends CIconRaw {}